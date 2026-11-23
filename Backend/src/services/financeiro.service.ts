import type {
    CriarCategoriaFinanceira,
    CriarMovimentacaoFinanceira,
    CriarTransferencia,
} from "../types/financeiro.types.js";
import { financeiroRepository } from "../repository/financeiro.repository.js";

export class FinanceiroService {
    // ================= CATEGORIAS ================

    async getCategorias() {
        return financeiroRepository.getCategorias();
    }

    async getCategoriaById(id: string) {
        const categoria = await financeiroRepository.getCategoriaById(id);
        if (!categoria) {
            throw new Error("Categoria não encontrada");
        }
        return categoria;
    }

    async criarCategoria(data: CriarCategoriaFinanceira) {
        if (!data.nome.trim()) {
            throw new Error("O nome da categoria é obrigatório");
        }
        if (data.tipo !== "entrada" && data.tipo !== "saida") {
            throw new Error("Tipo de categoria inválido");
        }
        return financeiroRepository.criarCategoria(data);
    }

    async inativarCategoria(id: string) {
        const categoria = await financeiroRepository.getCategoriaById(id);

        if (!categoria) {
            throw new Error("Categoria não encontrada");
        }
        return financeiroRepository.inativarCategoria(id);
    }

    // ================= MOVIMENTAÇÕES =================

    async getMovimentacoes() {
        return financeiroRepository.getMovimentacoes();
    }

    async getMovimentacaoById(id: string) {
        const movimentacao =
            await financeiroRepository.getMovimentacaoById(id);
        if (!movimentacao) {
            throw new Error("Movimentação não encontrada");
        }
        return movimentacao;
    }

    async criarMovimentacao(data: CriarMovimentacaoFinanceira) {
        if (!data.descricao.trim()) {
            throw new Error("A descrição é obrigatória");
        }
        if (data.valor <= 0 || !Number.isFinite(data.valor)) {
            throw new Error("O valor deve ser maior que zero");
        }
        if (data.tipo !== "entrada" && data.tipo !== "saida") {
            throw new Error("Tipo de movimentação inválido");
        }
        if (data.id_categoria) {
            const categoria =
                await financeiroRepository.getCategoriaById(data.id_categoria);
            if (!categoria || !categoria.ativo) {
                throw new Error("Categoria não encontrada ou inativa");
            }
            if (categoria.tipo !== data.tipo) {
                throw new Error(
                    "O tipo da categoria não corresponde à movimentação",
                );
            }
        }

        return financeiroRepository.criarMovimentacao(data);
    }

    // ================= TRANSFERÊNCIAS =================

    async getTransferencias() {
        return financeiroRepository.getTransferencias();
    }

    async getTransferenciaById(id: string) {
        const transferencia =
            await financeiroRepository.getTransferenciaById(id);

        if (!transferencia) {
            throw new Error("Transferência não encontrada");
        }

        return transferencia;
    }

    async criarTransferencia(data: CriarTransferencia) {
        if (!data.banco_origem.trim()) {
            throw new Error("O banco de origem é obrigatório");
        }

        if (!data.banco_destino.trim()) {
            throw new Error("O banco de destino é obrigatório");
        }

        if (data.banco_origem === data.banco_destino) {
            throw new Error("Os bancos de origem e destino devem ser diferentes");
        }

        if (data.valor <= 0 || !Number.isFinite(data.valor)) {
            throw new Error("O valor da transferência deve ser maior que zero");
        }

        return financeiroRepository.criarTransferencia(data);
    }
}

export const financeiroService = new FinanceiroService();