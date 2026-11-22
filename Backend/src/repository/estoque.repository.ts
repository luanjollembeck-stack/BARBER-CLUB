import { knex } from "../database/knex.js";
import type {
  Produto,
  CriarProduto,
  MovimentacaoEstoque,
  CriarMovimentacaoEstoque
} from "../types/estoque.types.js";

class EstoqueRepository {

  // PRODUTOS

  async getAll(): Promise<Produto[]> {
    return await knex("produtos")
      .where({ ativo: true })
      .select("*");
  }

  async getById(id: string): Promise<Produto | undefined> {
    return await knex("produtos")
      .where({ id_produto: id })
      .first();
  }

  async create(dados: CriarProduto): Promise<Produto> {
    const [produto] = await knex("produtos")
      .insert(dados)
      .returning("*");

    if (!produto) {
      throw new Error("O banco não retornou o produto cadastrado");
    }

    return produto;
  }

  async inativarProduto(id: string): Promise<boolean> {
    const quantidade = await knex("produtos")
      .where({ id_produto: id })
      .update({ ativo: false });
    return quantidade > 0;
  }

  // MOVIMENTAÇÕES DE ESTOQUE

  async getMovimentacoes(): Promise<MovimentacaoEstoque[]> {
    return await knex("movimentacoes_estoque")
      .select("*")
      .orderBy("data_movimentacao", "desc");
  }

  async getMovimentacoesByProduto(
    id: string
  ): Promise<MovimentacaoEstoque[]> {
    return await knex("movimentacoes_estoque")
      .where({ id_produto: id })
      .select("*")
      .orderBy("data_movimentacao", "desc");
  }

  async registrarMovimentacao(
    dados: CriarMovimentacaoEstoque
  ): Promise<MovimentacaoEstoque> {

    return await knex.transaction(async (trx) => {

      const tiposEntrada = [
        "entrada",
        "cancelamento_reserva",
        "ajuste"
      ];

      const tiposSaida = [
        "saida_venda",
        "consumo",
        "perda",
        "reserva"
      ];

      let alteracaoEstoque = 0;

      if (tiposEntrada.includes(dados.tipo)) {
        alteracaoEstoque = dados.quantidade;
      } else if (tiposSaida.includes(dados.tipo)) {
        alteracaoEstoque = -dados.quantidade;
      } else {
        throw new Error("Tipo de movimentação inválido");
      }

      // Atualiza o estoque
      const produtoAtualizado = await trx("produtos")
        .where({ id_produto: dados.id_produto })
        .modify((query) => {
          if (alteracaoEstoque < 0) {
            query.where("estoque", ">=", dados.quantidade);
          }
        })
        .increment("estoque", alteracaoEstoque);

      if (produtoAtualizado === 0) {
        throw new Error("Produto não encontrado ou estoque insuficiente");
      }

      // Registra a movimentação
      const [movimentacao] = await trx("movimentacoes_estoque")
        .insert({
          id_produto: dados.id_produto,
          id_funcionario: dados.id_funcionario ?? null,
          id_venda: dados.id_venda ?? null,
          tipo: dados.tipo,
          quantidade: dados.quantidade,
          motivo: dados.motivo ?? null
        })
        .returning("*");

      if (!movimentacao) {
        throw new Error("Erro ao registrar movimentação");
      }

      return movimentacao;
    });
  }
}

export const estoqueRepository = new EstoqueRepository();
