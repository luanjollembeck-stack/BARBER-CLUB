import { knex } from "../database/knex.js";
import type {
    CriarEstabelecimento,
    AtualizarEstabelecimento,
} from "../types/estabelecimento.types.js";

export class EstabelecimentoRepository {

    async get() {
        return knex("estabelecimento").first();
    }

    async getById(id: string) {
        return knex("estabelecimento")
            .where({ id_estabelecimento: id })
            .first();
    }

    async criar(data: CriarEstabelecimento) {
        const [estabelecimento] = await knex("estabelecimento")
            .insert(data)
            .returning("*");
        return estabelecimento;
    }

    async atualizar(
        id: string,
        data: AtualizarEstabelecimento,
    ) {
        const [estabelecimento] = await knex("estabelecimento")
            .where({ id_estabelecimento: id })
            .update(data)
            .returning("*");
        return estabelecimento;
    }
}

export const estabelecimentoRepository =
    new EstabelecimentoRepository();