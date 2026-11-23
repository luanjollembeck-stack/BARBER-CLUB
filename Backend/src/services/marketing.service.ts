import type {
    CriarMarketing,
    CriarComodidade,
} from "../types/marketing.types.js";

import { marketingRepository } from "../repository/marketing.repository.js";

import { knex } from "../database/knex.js";

export class MarketingService {

    // =============== MARKETING ===============

    async getAll() {
        return marketingRepository.getAll();
    }

    async getDestaques() {
        return marketingRepository.getDestaques();
    }

    async getById(id: string) {
        const marketing = await marketingRepository.getById(id);
        if (!marketing) {
            throw new Error("Conteúdo não encontrado");
        }
        return marketing;
    }

    async criar(data: CriarMarketing) {
        if (!data.titulo?.trim()) {
            throw new Error("O título é obrigatório");
        }

        const tiposValidos = [
            "barbearia",
            "profissional",
            "produto",
            "trabalho",
            "promocao",
        ];
        if (!tiposValidos.includes(data.tipo)) {
            throw new Error("Tipo de marketing inválido");
        }
        if (data.id_funcionario) {
            const funcionario = await knex("funcionarios")
                .where({
                    id_funcionario: data.id_funcionario,
                    ativo: true,
                })
                .first();
            if (!funcionario) {
                throw new Error("Funcionário não encontrado ou inativo");
            }
        }

        if (data.id_produto) {
            const produto = await knex("produtos")
                .where({
                    id_produto: data.id_produto,
                    ativo: true,
                })
                .first();
            if (!produto) {
                throw new Error("Produto não encontrado ou inativo");
            }
        }
        return marketingRepository.criar(data);
    }

    async inativar(id: string) {
        const marketing = await marketingRepository.getById(id);
        if (!marketing) {
            throw new Error("Conteúdo não encontrado");
        }
        return marketingRepository.inativar(id);
    }

    // =============== COMODIDADES ===============

    async getComodidades() {
        return marketingRepository.getComodidades();
    }

    async getComodidadeById(id: string) {
        const comodidade =
            await marketingRepository.getComodidadeById(id);
        if (!comodidade) {
            throw new Error("Comodidade não encontrada");
        }
        return comodidade;
    }

    async criarComodidade(data: CriarComodidade) {
        if (!data.nome?.trim()) {
            throw new Error("O nome da comodidade é obrigatório");
        }
        return marketingRepository.criarComodidade(data);
    }

    async atualizarDisponibilidade(
        id: string,
        disponivel: boolean,
    ) {
        const comodidade =
            await marketingRepository.getComodidadeById(id);

        if (!comodidade) {
            throw new Error("Comodidade não encontrada");
        }
        if (typeof disponivel !== "boolean") {
            throw new Error("Disponibilidade inválida");
        }
        return marketingRepository.atualizarDisponibilidade(
            id,
            disponivel,
        );
    }

    async inativarComodidade(id: string) {
        const comodidade =
            await marketingRepository.getComodidadeById(id);
        if (!comodidade) {
            throw new Error("Comodidade não encontrada");
        }
        return marketingRepository.inativarComodidade(id);
    }
}

export const marketingService = new MarketingService();