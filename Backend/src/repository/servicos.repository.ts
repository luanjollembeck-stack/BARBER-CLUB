import { knex } from "../database/knex.js";
import type { Servico, CriarServico } from "../types/servicos.types.js";

class ServicosRepository {

  async getAll(): Promise<Servico[]> {
    return await knex("servicos").where({ ativo: true }).select("*");
  }

  async getById(id: string): Promise<Servico[]> {
    return await knex("servicos").where({ id_servico: id }).select("*");
  }

  async create(dados: CriarServico): Promise<Servico> {
    const [servico] = await knex("servicos").insert(dados).returning("*");

    if (!servico) {
      throw new Error("O banco não retornou o serviço cadastrado");
    }
    return servico;
  }

  async inativarServico(id: string): Promise<boolean> {
    const quantidade = await knex("servicos").where({ id_servico: id }).update({ ativo: false });

    return quantidade > 0;
  }
}

export const servicosRepository = new ServicosRepository();