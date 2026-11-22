
import { vendasRepository } from "../repository/vendas.repository.js";

import type {
    CriarVendaCompleta,
    CriarReservaProduto
} from "../types/vendas.types.js";

class VendasService {

    // VENDAS

    async getAll() {
        return await vendasRepository.getAll();
    }

    async getById(id: string) {
        return await vendasRepository.getById(id);
    }

    async getItens(id: string) {
        return await vendasRepository.getItens(id);
    }

    async create(dados: CriarVendaCompleta) {
        if (!dados.itens || dados.itens.length === 0) {
            throw new Error("A venda precisa possuir pelo menos um item");
        }
        for (const item of dados.itens) {
            if (item.quantidade <= 0) {
                throw new Error("A quantidade deve ser maior que zero");
            }
            if (item.preco_unitario < 0) {
                throw new Error("O preço não pode ser negativo");
            }
            const possuiProduto = !!item.id_produto;
            const possuiServico = !!item.id_servico;
            if (possuiProduto === possuiServico) {
                throw new Error(
                    "O item deve possuir um produto ou um serviço"
                );
            }
        }
        if ((dados.venda.desconto ?? 0) < 0) {
            throw new Error("O desconto não pode ser negativo");
        }
        return await vendasRepository.create(dados);
    }

    async atualizarStatus(id: string, status: string) {
        const statusPermitidos = [
            "pendente",
            "concluida",
            "cancelada"
        ];
        if (!statusPermitidos.includes(status)) {
            throw new Error("Status da venda inválido");
        }
        return await vendasRepository.atualizarStatus(id, status);
    }

    // RESERVAS

    async getReservas() {
        return await vendasRepository.getReservas();
    }

    async getReservaById(id: string) {
        return await vendasRepository.getReservaById(id);
    }

    async createReserva(dados: CriarReservaProduto) {
        if (dados.quantidade <= 0) {
            throw new Error("A quantidade deve ser maior que zero");
        }
        return await vendasRepository.createReserva(dados);
    }

    async atualizarReserva(id: string, status: string) {
        const statusPermitidos = [
            "vendido",
            "cancelado",
            "expirado"
        ];
        if (!statusPermitidos.includes(status)) {
            throw new Error("Status da reserva inválido");
        }
        return await vendasRepository.atualizarReserva(id, status);
    }
}

export const vendasService = new VendasService(); 