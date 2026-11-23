import { type Request, type Response } from "express";
import { financeiroService } from "../services/financeiro.service.js";

export class FinanceiroController {
    // ================= CATEGORIAS =================

    async getCategorias(request: Request, response: Response) {
        try {
            const categorias = await financeiroService.getCategorias();
            return response.status(200).json(categorias);
        } catch (error) {
            return response.status(500).json({
                message: "Erro ao buscar categorias",
            });
        }
    }

    async getCategoriaById(request: Request, response: Response) {
        const { id } = request.params;
        if (typeof id !== "string") {
            return response.status(400).json({
                message: "ID inválido",
            });
        }
        try {
            const categoria = await financeiroService.getCategoriaById(id);
            return response.status(200).json(categoria);
        } catch (error) {
            return response.status(404).json({
                message: "Categoria não encontrada",
            });
        }
    }

    async postCategoria(request: Request, response: Response) {
        try {
            const categoria = await financeiroService.criarCategoria(
                request.body,
            );
            return response.status(201).json(categoria);
        } catch (error) {
            return response.status(400).json({
                message:
                    error instanceof Error
                        ? error.message
                        : "Erro ao criar categoria",
            });
        }
    }

    async patchCategoria(request: Request, response: Response) {
        const { id } = request.params
        if (typeof id !== "string") {
            return response.status(400).json({
                message: "ID inválido",
            });
        }
        try {
            const categoria = await financeiroService.inativarCategoria(id);
            return response.status(200).json(categoria);
        } catch (error) {
            return response.status(404).json({
                message: "Categoria não encontrada",
            });
        }
    }

    // ================= MOVIMENTAÇÕES =================

    async getMovimentacoes(request: Request, response: Response) {
        try {
            const movimentacoes =
                await financeiroService.getMovimentacoes();
            return response.status(200).json(movimentacoes);
        } catch (error) {
            return response.status(500).json({
                message: "Erro ao buscar movimentações",
            });
        }
    }

    async getMovimentacaoById(request: Request, response: Response) {
        const { id } = request.params;
        if (typeof id !== "string") {
            return response.status(400).json({
                message: "ID inválido",
            });
        }
        try {
            const movimentacao =
                await financeiroService.getMovimentacaoById(id);
            return response.status(200).json(movimentacao);
        } catch (error) {
            return response.status(404).json({
                message: "Movimentação não encontrada",
            });
        }
    }

    async postMovimentacao(request: Request, response: Response) {
        try {
            const movimentacao =
                await financeiroService.criarMovimentacao(request.body);
            return response.status(201).json(movimentacao);
        } catch (error) {
            return response.status(400).json({
                message:
                    error instanceof Error
                        ? error.message
                        : "Erro ao criar movimentação",
            });
        }
    }

    // ================= TRANSFERÊNCIAS =================

    async getTransferencias(request: Request, response: Response) {
        try {
            const transferencias =
                await financeiroService.getTransferencias();

            return response.status(200).json(transferencias);
        } catch (error) {
            return response.status(500).json({
                message: "Erro ao buscar transferências",
            });
        }
    }

    async getTransferenciaById(request: Request, response: Response) {
        const { id } = request.params;
        if (typeof id !== "string") {
            return response.status(400).json({
                message: "ID inválido",
            });
        }
        try {
            const transferencia =
                await financeiroService.getTransferenciaById(id);
            return response.status(200).json(transferencia);
        } catch (error) {
            return response.status(404).json({
                message: "Transferência não encontrada",
            });
        }
    }

    async postTransferencia(request: Request, response: Response) {
        try {
            const transferencia =
                await financeiroService.criarTransferencia(request.body);
            return response.status(201).json(transferencia);
        } catch (error) {
            return response.status(400).json({
                message:
                    error instanceof Error
                        ? error.message
                        : "Erro ao criar transferência",
            });
        }
    }
}

export const financeiroController = new FinanceiroController();