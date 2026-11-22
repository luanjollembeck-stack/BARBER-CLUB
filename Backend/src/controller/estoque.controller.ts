import { type Request, type Response } from "express";
import { produtosService as estoqueService } from "../services/estoque.service.js";

class EstoqueController {

    // PRODUTOS

    async get(request: Request, response: Response) {
        try {
            const produtos = await estoqueService.getAll();
            return response.json(produtos);
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: "Erro ao buscar produtos"
            });
        }
    }

    async getById(request: Request, response: Response) {
        try {
            const { id } = request.params;
            if (typeof id !== "string") {
                return response.status(400).json({
                    error: "ID do produto inválido"
                });
            }
            const produto = await estoqueService.getById(id);
            if (!produto) {
                return response.status(404).json({
                    error: "Produto não encontrado"
                });
            }
            return response.json(produto);
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: "Erro ao buscar produto"
            });
        }
    }

    async post(request: Request, response: Response) {
        try {
            const produto = await estoqueService.create(request.body);
            return response.status(201).json(produto);
        } catch (error) {
            console.error(error);
            return response.status(400).json({
                error: "Erro ao cadastrar produto"
            });
        }
    }

    async patch(request: Request, response: Response) {
        try {
            const { id } = request.params;
            if (typeof id !== "string") {
                return response.status(400).json({
                    error: "ID do produto inválido"
                });
            }
            const inativado = await estoqueService.inativarProduto(id);
            if (!inativado) {
                return response.status(404).json({
                    error: "Produto não encontrado"
                });
            }
            return response.json({
                message: "Produto inativado com sucesso"
            });
        } catch (error) {
            console.error(error);
            return response.status(400).json({
                error: "Erro ao inativar produto"
            });
        }
    }

    // MOVIMENTAÇÕES

    async getMovimentacoes(request: Request, response: Response) {
        try {
            const movimentacoes = await estoqueService.getMovimentacoes();
            return response.json(movimentacoes);
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: "Erro ao buscar movimentações"
            });
        }
    }

    async getMovimentacoesByProduto(
        request: Request,
        response: Response
    ) {
        try {
            const { id } = request.params;
            if (typeof id !== "string") {
                return response.status(400).json({
                    error: "ID do produto inválido"
                });
            }
            const movimentacoes =
                await estoqueService.getMovimentacoesByProduto(id);
            return response.json(movimentacoes);
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: "Erro ao buscar movimentações do produto"
            });
        }
    }

    async postMovimentacao(request: Request, response: Response) {
        try {
            const movimentacao =
                await estoqueService.registrarMovimentacao(request.body);
            return response.status(201).json(movimentacao);
        } catch (error) {
            console.error(error);
            return response.status(400).json({
                error: error instanceof Error
                    ? error.message
                    : "Erro ao registrar movimentação"
            });
        }
    }
}

export const estoqueController = new EstoqueController();
