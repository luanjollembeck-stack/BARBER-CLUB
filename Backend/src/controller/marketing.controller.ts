import { type Request, type Response } from "express";

import { marketingService } from "../services/marketing.service.js";

export class MarketingController {

    // =============== MARKETING ===============

    async get(request: Request, response: Response) {
        try {
            const marketing = await marketingService.getAll();
            return response.status(200).json(marketing);
        } catch (error) {
            return response.status(500).json({
                message: "Erro ao buscar conteúdos",
            });
        }
    }

    async getDestaques(request: Request, response: Response) {
        try {
            const destaques = await marketingService.getDestaques();
            return response.status(200).json(destaques);
        } catch (error) {
            return response.status(500).json({
                message: "Erro ao buscar destaques",
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
            const marketing = await marketingService.getById(id);
            return response.status(200).json(marketing);
        } catch (error) {
            return response.status(404).json({
                message: "Conteúdo não encontrado",
            });
        }
    }

    async post(request: Request, response: Response) {
        try {
            const marketing = await marketingService.criar(request.body);
            return response.status(201).json(marketing);
        } catch (error) {
            return response.status(400).json({
                message:
                    error instanceof Error
                        ? error.message
                        : "Erro ao criar conteúdo",
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
            const marketing = await marketingService.inativar(id);
            return response.status(200).json(marketing);
        } catch (error) {
            return response.status(404).json({
                message: "Conteúdo não encontrado",
            });
        }
    }

    // =============== COMODIDADES ===============

    async getComodidades(request: Request, response: Response) {
        try {
            const comodidades = await marketingService.getComodidades();
            return response.status(200).json(comodidades);
        } catch (error) {
            return response.status(500).json({
                message: "Erro ao buscar comodidades",
            });
        }
    }

    async getComodidadeById(request: Request, response: Response) {
        const { id } = request.params;
        if (typeof id !== "string") {
            return response.status(400).json({
                message: "ID inválido",
            });
        }
        try {
            const comodidade =
                await marketingService.getComodidadeById(id);
            return response.status(200).json(comodidade);
        } catch (error) {
            return response.status(404).json({
                message: "Comodidade não encontrada",
            });
        }
    }

    async postComodidade(request: Request, response: Response) {
        try {
            const comodidade =
                await marketingService.criarComodidade(request.body);
            return response.status(201).json(comodidade);
        } catch (error) {
            return response.status(400).json({
                message:
                    error instanceof Error
                        ? error.message
                        : "Erro ao criar comodidade",
            });
        }
    }

    async patchComodidade(request: Request, response: Response) {
        const { id } = request.params;
        if (typeof id !== "string") {
            return response.status(400).json({
                message: "ID inválido",
            });
        }
        try {
            const comodidade =
                await marketingService.atualizarDisponibilidade(
                    id,
                    request.body.disponivel,
                );
            return response.status(200).json(comodidade);
        } catch (error) {
            return response.status(400).json({
                message:
                    error instanceof Error
                        ? error.message
                        : "Erro ao atualizar comodidade",
            });
        }
    }
}

export const marketingController = new MarketingController();