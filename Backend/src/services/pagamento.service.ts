import { pagamentosRepository } from "../repository/pagamentos.repository.js";
import type {
    CriarFormaPagamento,
    CriarPagamento
} from "../types/pagamento.types.js";

class PagamentosService {

    // FORMAS DE PAGAMENTO

    async getFormas() {
        return await pagamentosRepository.getFormas();
    }

    async getFormaById(id: string) {
        return await pagamentosRepository.getFormaById(id);
    }

    async createForma(dados: CriarFormaPagamento) {
        if (!dados.nome || dados.nome.trim() === "") {
            throw new Error("Informe o nome da forma de pagamento");
        }
        return await pagamentosRepository.createForma(dados);
    }

    async inativarForma(id: string) {
        return await pagamentosRepository.inativarForma(id);
    }

    // PAGAMENTOS

    async getAll() {
        return await pagamentosRepository.getAll();
    }

    async getById(id: string) {
        return await pagamentosRepository.getById(id);
    }

    async getByVenda(id: string) {
        return await pagamentosRepository.getByVenda(id);
    }

    async create(dados: CriarPagamento) {
        if (dados.valor <= 0) {
            throw new Error("O valor do pagamento deve ser maior que zero");
        }
        if (!dados.id_venda || !dados.id_forma_pagamento) {
            throw new Error("Venda e forma de pagamento são obrigatórias");
        }
        return await pagamentosRepository.create(dados);
    }

    async atualizarStatus(id: string, status: string) {
        const statusPermitidos = [
            "pendente",
            "confirmado",
            "estornado"
        ];
        if (!statusPermitidos.includes(status)) {
            throw new Error("Status do pagamento inválido");
        }
        return await pagamentosRepository.atualizarStatus(id, status);
    }
}

export const pagamentosService = new PagamentosService();