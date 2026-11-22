import { knex } from "../database/knex.js";

import type { Cliente, CriarCliente } from "../types/clientes.types.js";

class ClientesRepository {

  async getAll(): Promise<Cliente[]> {
    return await knex("clientes").where({ ativo: true }).select("*");
  }

  async getById(id: string): Promise<Cliente[]> {
    return await knex("clientes").where({ id_cliente: id }).select("*");
  }

  async create(dados: CriarCliente): Promise<Cliente> {
    const [cliente] = await knex("clientes").insert(dados).returning("*");
    if (!cliente) {
      throw new Error("O banco não retornou o cliente cadastrado");
    }
    return cliente;
  }

  async inativarCliente(id: string): Promise<boolean> {
    const quantidade = await knex("clientes").where({ id_cliente: id }).update({ ativo: false });
    return quantidade > 0;
  }
}

export const clientesRepository = new ClientesRepository();