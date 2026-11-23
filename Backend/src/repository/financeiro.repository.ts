import { knex } from "../database/knex.js";
import type {
  CriarCategoriaFinanceira,
  CriarMovimentacaoFinanceira,
  CriarTransferencia,
} from "../types/financeiro.types.js";

export class FinanceiroRepository {
  // ================= CATEGORIAS =================

  async getCategorias() {
    return knex("categorias_financeiras")   
      .where({ ativo: true })
      .orderBy("nome");
  }

  async getCategoriaById(id: string) {
    return knex("categorias_financeiras")
      .where({ id_categoria: id })
      .first();
  }

  async criarCategoria(data: CriarCategoriaFinanceira) {
    const [categoria] = await knex("categorias_financeiras")
      .insert(data)
      .returning("*");

    return categoria;
  }

  async inativarCategoria(id: string) {
    const [categoria] = await knex("categorias_financeiras")
      .where({ id_categoria: id })
      .update({ ativo: false })
      .returning("*");

    return categoria;
  }

  // ================= MOVIMENTAÇÕES =================

  async getMovimentacoes() {
    return knex("movimentacoes_financeiras")
      .orderBy("data_movimentacao", "desc");
  }

  async getMovimentacaoById(id: string) {
    return knex("movimentacoes_financeiras")
      .where({ id_movimentacao_financeira: id })
      .first();
  }

  async criarMovimentacao(data: CriarMovimentacaoFinanceira) {
    const [movimentacao] = await knex("movimentacoes_financeiras")
      .insert(data)
      .returning("*");

    return movimentacao;
  }

  // ================= TRANSFERÊNCIAS =================

  async getTransferencias() {
    return knex("transferencias")
      .orderBy("data_transferencia", "desc");
  }

  async getTransferenciaById(id: string) {
    return knex("transferencias")
      .where({ id_transferencia: id })
      .first();
  }

  async criarTransferencia(data: CriarTransferencia) {
    const [transferencia] = await knex("transferencias")
      .insert(data)
      .returning("*");

    return transferencia;
  }
}

export const financeiroRepository = new FinanceiroRepository();