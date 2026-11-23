import { type Request, type Response } from "express";
import { estabelecimentoService } from "../services/estabelecimento.service.js";

export class EstabelecimentoController {

    async get(request: Request, response: Response) {
        try {
            const estabelecimento = await estabelecimentoService.get();
            if (!estabelecimento) {
                return response.status(404).json({
                    message: "Estabelecimento não cadastrado",
                });
            }
            return response.status(200).json(estabelecimento);
        } catch (error) {
            return response.status(500).json({
                message: "Erro ao buscar estabelecimento",
            });
        }
    }

    async getById(request: Request, response: Response) {
        const { id } = request.params;
        if (typeof id !== "string") {
            return response.status(400).json({
                message: "ID inválido",
            });
        }
        try {
            const estabelecimento =
                await estabelecimentoService.getById(id);
            return response.status(200).json(estabelecimento);
        } catch (error) {
            return response.status(404).json({
                message: "Estabelecimento não encontrado",
            });
        }
    }

    async post(request: Request, response: Response) {
        try {
            const estabelecimento =
                await estabelecimentoService.criar(request.body);
            return response.status(201).json(estabelecimento);
        } catch (error) {
            return response.status(400).json({
                message:
                    error instanceof Error
                        ? error.message
                        : "Erro ao cadastrar estabelecimento",
            });
        }
    }

    async patch(request: Request, response: Response) {
        const { id } = request.params;
        if (typeof id !== "string") {
            return response.status(400).json({
                message: "ID inválido",
            });
        }
        try {
            const estabelecimento =
                await estabelecimentoService.atualizar(
                    id,
                    request.body,
                );
            return response.status(200).json(estabelecimento);
        } catch (error) {
            return response.status(400).json({
                message:
                    error instanceof Error
                        ? error.message
                        : "Erro ao atualizar estabelecimento",
            });
        }
    }
}

export const estabelecimentoController =
    new EstabelecimentoController();