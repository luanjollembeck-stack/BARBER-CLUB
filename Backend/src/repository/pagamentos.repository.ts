
import { knex } from "../database/knex.js";

import type {
    FormaPagamento,
    CriarFormaPagamento,
    Pagamento,
    CriarPagamento
} from "../types/pagamento.types.js";

class PagamentosRepository {

    // FORMAS DE PAGAMENTO

    async getFormas(): Promise<FormaPagamento[]> {
        return await knex("formas_pagamento")
            .where({ ativo: true })
            .select("*");
    }

    async getFormaById(id: string): Promise<FormaPagamento | undefined> {
        return await knex("formas_pagamento")
            .where({ id_forma_pagamento: id })
            .first();
    }

    async createForma(
        dados: CriarFormaPagamento
    ): Promise<FormaPagamento> {
        const [forma] = await knex("formas_pagamento")
            .insert(dados)
            .returning("*");
        if (!forma) {
            throw new Error("Erro ao cadastrar forma de pagamento");
        }
        return forma;
    }

    async inativarForma(id: string): Promise<boolean> {
        const quantidade = await knex("formas_pagamento")
            .where({ id_forma_pagamento: id })
            .update({ ativo: false });
        return quantidade > 0;
    }

    // PAGAMENTOS

    async getAll(): Promise<Pagamento[]> {
        return await knex("pagamentos")
            .select("*")
            .orderBy("data_pagamento", "desc");
    }

    async getById(id: string): Promise<Pagamento | undefined> {
        return await knex("pagamentos")
            .where({ id_pagamento: id })
            .first();
    }

    async getByVenda(id: string): Promise<Pagamento[]> {
        return await knex("pagamentos")
            .where({ id_venda: id })
            .select("*")
            .orderBy("data_pagamento", "desc");
    }

    async create(dados: CriarPagamento): Promise<Pagamento> {
        const [pagamento] = await knex("pagamentos")
            .insert({
                ...dados,
                status: "pendente"
            })
            .returning("*");
        if (!pagamento) {
            throw new Error("Erro ao cadastrar pagamento");
        }
        return pagamento;
    }

    async atualizarStatus(
        id: string,
        status: string
    ): Promise<boolean> {
        const quantidade = await knex("pagamentos")
            .where({ id_pagamento: id })
            .update({ status });
        return quantidade > 0;
    }
}

export const pagamentosRepository = new PagamentosRepository();
