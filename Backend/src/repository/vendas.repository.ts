
import { knex } from "../database/knex.js";

import type {
    Venda,
    ItemVenda,
    ReservaProduto,
    CriarVendaCompleta,
    CriarReservaProduto
} from "../types/vendas.types.js";

class VendasRepository {

    // VENDAS

    async getAll(): Promise<Venda[]> {
        return await knex("vendas")
            .select("*")
            .orderBy("data_venda", "desc");
    }

    async getById(id: string): Promise<Venda | undefined> {
        return await knex("vendas")
            .where({ id_venda: id })
            .first();
    }

    async getItens(id: string): Promise<ItemVenda[]> {
        return await knex("itens_venda")
            .where({ id_venda: id })
            .select("*");
    }

    async create(dados: CriarVendaCompleta): Promise<Venda> {
        return await knex.transaction(async (trx) => {
            let valorTotal = 0;

            // Calcula o valor dos itens
            for (const item of dados.itens) {
                valorTotal += item.quantidade * item.preco_unitario;
            }
            const desconto = dados.venda.desconto ?? 0;
            if (desconto > valorTotal) {
                throw new Error("Desconto maior que o valor da venda");
            }
            valorTotal -= desconto;
            // Cria a venda
            const [venda] = await trx("vendas")
                .insert({
                    ...dados.venda,
                    valor_total: valorTotal,
                    desconto,
                    status: "pendente"
                })
                .returning("*");
            if (!venda) {
                throw new Error("Erro ao cadastrar venda");
            }
            // Cadastra os itens
            for (const item of dados.itens) {
                const subtotal = item.quantidade * item.preco_unitario;
                const [itemCadastrado] = await trx("itens_venda")
                    .insert({
                        id_venda: venda.id_venda,
                        id_produto: item.id_produto ?? null,
                        id_servico: item.id_servico ?? null,
                        quantidade: item.quantidade,
                        preco_unitario: item.preco_unitario,
                        subtotal
                    })
                    .returning("*");
                if (!itemCadastrado) {
                    throw new Error("Erro ao cadastrar item da venda");
                }
                // Caso seja produto, baixa o estoque
                if (item.id_produto) {
                    const produtoAtualizado = await trx("produtos")
                        .where({ id_produto: item.id_produto })
                        .where("estoque", ">=", item.quantidade)
                        .decrement("estoque", item.quantidade);

                    if (produtoAtualizado === 0) {
                        throw new Error("Produto não encontrado ou estoque insuficiente");
                    }
                    // Registra a saída no estoque
                    await trx("movimentacoes_estoque").insert({
                        id_produto: item.id_produto,
                        id_funcionario: dados.venda.id_funcionario ?? null,
                        id_venda: venda.id_venda,
                        tipo: "saida_venda",
                        quantidade: item.quantidade,
                        motivo: "Venda de produto"
                    });
                }
            }

            return venda;
        });
    }

    // ATUALIZAR STATUS DA VENDA

    async atualizarStatus(
        id: string,
        status: string
    ): Promise<boolean> {
        return await knex.transaction(async (trx) => {
            const venda = await trx("vendas")
                .where({ id_venda: id })
                .first();
            if (!venda) {
                return false;
            }
            // Evita cancelar uma venda já cancelada
            if (venda.status === "cancelada" && status === "cancelada") {
                return true;
            }
            // Se cancelar, devolve os produtos ao estoque
            if (status === "cancelada" && venda.status !== "cancelada") {
                const itens = await trx("itens_venda")
                    .where({ id_venda: id })
                    .select("*");
                for (const item of itens) {
                    if (item.id_produto) {
                        await trx("produtos")
                            .where({ id_produto: item.id_produto })
                            .increment("estoque", item.quantidade);
                        await trx("movimentacoes_estoque").insert({
                            id_produto: item.id_produto,
                            id_funcionario: venda.id_funcionario,
                            id_venda: id,
                            tipo: "entrada",
                            quantidade: item.quantidade,
                            motivo: "Devolução por cancelamento de venda"
                        });
                    }
                }
            }

            const quantidade = await trx("vendas")
                .where({ id_venda: id })
                .update({ status });
            return quantidade > 0;
        });
    }

    // RESERVAS

    async getReservas(): Promise<ReservaProduto[]> {
        return await knex("reservas_produtos")
            .select("*")
            .orderBy("data_reserva", "desc");
    }

    async getReservaById(id: string): Promise<ReservaProduto | undefined> {
        return await knex("reservas_produtos")
            .where({ id_reserva: id })
            .first();
    }

    async createReserva(
        dados: CriarReservaProduto
    ): Promise<ReservaProduto> {
        return await knex.transaction(async (trx) => {
            // Retira a quantidade reservada do estoque disponível
            const produtoAtualizado = await trx("produtos")
                .where({ id_produto: dados.id_produto })
                .where("estoque", ">=", dados.quantidade)
                .decrement("estoque", dados.quantidade);
            if (produtoAtualizado === 0) {
                throw new Error("Produto não encontrado ou estoque insuficiente");
            }

            // Registra a reserva
            const [reserva] = await trx("reservas_produtos")
                .insert({
                    ...dados,
                    id_agendamento: dados.id_agendamento ?? null,
                    status: "reservado"
                })
                .returning("*");
            if (!reserva) {
                throw new Error("Erro ao cadastrar reserva");
            }

            // Registra movimentação de estoque
            await trx("movimentacoes_estoque").insert({
                id_produto: dados.id_produto,
                tipo: "reserva",
                quantidade: dados.quantidade,
                motivo: "Produto reservado"
            });
            return reserva;
        });
    }

    async atualizarReserva(
        id: string,
        status: string
    ): Promise<boolean> {
        return await knex.transaction(async (trx) => {
            const reserva = await trx("reservas_produtos")
                .where({ id_reserva: id })
                .first();
            if (!reserva) {
                return false;
            }
            // Só permite alterar reservas ativas
            if (reserva.status !== "reservado") {
                return false;
            }
            // Cancelamento ou expiração devolvem o estoque
            if (status === "cancelado" || status === "expirado") {
                await trx("produtos")
                    .where({ id_produto: reserva.id_produto })
                    .increment("estoque", reserva.quantidade);

                await trx("movimentacoes_estoque").insert({
                    id_produto: reserva.id_produto,
                    tipo: "cancelamento_reserva",
                    quantidade: reserva.quantidade,
                    motivo: `Reserva ${status}`
                });
            }

            const quantidade = await trx("reservas_produtos")
                .where({ id_reserva: id })
                .update({ status });
            return quantidade > 0;
        });
    }
}

export const vendasRepository = new VendasRepository();
