import { knex } from "../database/knex.js";

import type {
  CriarPlano,
  CriarAssinatura,
} from "../types/planos.types.js";

export class PlanosRepository {

  // =============== PLANOS ===============

  async getPlanos() {
    return knex("planos")
      .where({ ativo: true })
      .orderBy("preco");
  }

  async getPlanoById(id: string) {
    return knex("planos")
      .where({ id_plano: id })
      .first();
  }

  async criarPlano(data: CriarPlano) {
    const [plano] = await knex("planos")
      .insert(data)
      .returning("*");
    return plano;
  }

  async inativarPlano(id: string) {
    const [plano] = await knex("planos")
      .where({ id_plano: id })
      .update({ ativo: false })
      .returning("*");
    return plano;
  }

  // =============== ASSINATURAS ===============

  async getAssinaturas() {
    return knex("assinaturas")
      .orderBy("criado_em", "desc");
  }

  async getAssinaturaById(id: string) {
    return knex("assinaturas")
      .where({ id_assinatura: id })
      .first();
  }

  async getAssinaturasByCliente(id_cliente: string) {
    return knex("assinaturas")
      .where({ id_cliente })
      .orderBy("criado_em", "desc");
  }

  async criarAssinatura(data: CriarAssinatura) {
    const [assinatura] = await knex("assinaturas")
      .insert({
        ...data,
        status: "pendente",
      })
      .returning("*");
    return assinatura;
  }

  async atualizarStatus(
    id: string,
    status: "ativa" | "pendente" | "cancelada" | "expirada",
  ) {
    const [assinatura] = await knex("assinaturas")
      .where({ id_assinatura: id })
      .update({ status })
      .returning("*");

    return assinatura;
  }

  async atualizarRenovacao(
    id: string,
    renovacao_automatica: boolean,
  ) {
    const [assinatura] = await knex("assinaturas")
      .where({ id_assinatura: id })
      .update({ renovacao_automatica })
      .returning("*");
    return assinatura;
  }
}

export const planosRepository = new PlanosRepository();