import { knex } from "../database/knex.js";

import type {
    CriarMarketing,
    CriarComodidade,
} from "../types/marketing.types.js";

export class MarketingRepository {

    // =============== MARKETING ===============

    async getAll() {
        return knex("marketing")
            .where({ ativo: true })
            .orderBy("criado_em", "desc");
    }

    async getDestaques() {
        return knex("marketing")
            .where({ ativo: true, destaque: true })
            .orderBy("criado_em", "desc");
    }

    async getById(id: string) {
        return knex("marketing")
            .where({ id_marketing: id })
            .first();
    }

    async criar(data: CriarMarketing) {
        const [marketing] = await knex("marketing")
            .insert(data)
            .returning("*");
        return marketing;
    }

    async inativar(id: string) {
        const [marketing] = await knex("marketing")
            .where({ id_marketing: id })
            .update({ ativo: false })
            .returning("*");
        return marketing;
    }

    // =============== COMODIDADES ===============

    async getComodidades() {
        return knex("comodidades")
            .orderBy("nome");
    }

    async getComodidadeById(id: string) {
        return knex("comodidades")
            .where({ id_comodidade: id })
            .first();
    }

    async criarComodidade(data: CriarComodidade) {
        const [comodidade] = await knex("comodidades")
            .insert(data)
            .returning("*");
        return comodidade;
    }

    async atualizarDisponibilidade(
        id: string,
        disponivel: boolean,
    ) {
        const [comodidade] = await knex("comodidades")
            .where({ id_comodidade: id })
            .update({ disponivel })
            .returning("*");
        return comodidade;
    }

    async inativarComodidade(id: string) {
        const [comodidade] = await knex("comodidades")
            .where({ id_comodidade: id })
            .update({ disponivel: false })
            .returning("*");
        return comodidade;
    }
}

export const marketingRepository = new MarketingRepository();