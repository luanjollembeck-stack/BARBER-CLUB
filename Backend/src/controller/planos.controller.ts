import { type Request, type Response } from "express";
import { planosService } from "../services/planos.service.js";

export class PlanosController {

    // =============== PLANOS ===============

    async getPlanos(request: Request, response: Response) {
        try {
            const planos = await planosService.getPlanos();
            return response.status(200).json(planos);
        } catch (error) {
            return response.status(500).json({
                message: "Erro ao buscar planos",
            });
        }
    }

    async getPlanoById(request: Request, response: Response) {
        const { id } = request.params;
        if (typeof id !== "string") {
            return response.status(400).json({
                message: "ID inválido",
            });
        }
        try {
            const plano = await planosService.getPlanoById(id);
            return response.status(200).json(plano);
        } catch (error) {
            return response.status(404).json({
                message: "Plano não encontrado",
            });
        }
    }

    async postPlano(request: Request, response: Response) {
        try {
            const plano = await planosService.criarPlano(request.body);
            return response.status(201).json(plano);
        } catch (error) {
            return response.status(400).json({
                message:
                    error instanceof Error
                        ? error.message
                        : "Erro ao criar plano",
            });
        }
    }

    async patchPlano(request: Request, response: Response) {
        const { id } = request.params;
        if (typeof id !== "string") {
            return response.status(400).json({
                message: "ID inválido",
            });
        }
        try {
            const plano = await planosService.inativarPlano(id);

            return response.status(200).json(plano);
        } catch (error) {
            return response.status(404).json({
                message: "Plano não encontrado",
            });
        }
    }

    // =============== ASSINATURAS ===============

    async getAssinaturas(request: Request, response: Response) {
        try {
            const assinaturas = await planosService.getAssinaturas();
            return response.status(200).json(assinaturas);
        } catch (error) {
            return response.status(500).json({
                message: "Erro ao buscar assinaturas",
            });
        }
    }

    async getAssinaturaById(request: Request, response: Response) {
        const { id } = request.params;
        if (typeof id !== "string") {
            return response.status(400).json({
                message: "ID inválido",
            });
        }
        try {
            const assinatura = await planosService.getAssinaturaById(id);
            return response.status(200).json(assinatura);
        } catch (error) {
            return response.status(404).json({
                message: "Assinatura não encontrada",
            });
        }
    }

    async getAssinaturasByCliente(request: Request, response: Response) {
        const { id } = request.params;
        if (typeof id !== "string") {
            return response.status(400).json({
                message: "ID inválido",
            });
        }

        try {
            const assinaturas =
                await planosService.getAssinaturasByCliente(id);
            return response.status(200).json(assinaturas);
        } catch (error) {
            return response.status(404).json({
                message:
                    error instanceof Error
                        ? error.message
                        : "Erro ao buscar assinaturas",
            });
        }
    }

    async postAssinatura(request: Request, response: Response) {
        try {
            const assinatura =
                await planosService.criarAssinatura(request.body);
            return response.status(201).json(assinatura);
        } catch (error) {
            return response.status(400).json({
                message:
                    error instanceof Error
                        ? error.message
                        : "Erro ao criar assinatura",
            });
        }
    }

    async patchStatus(request: Request, response: Response) {
        const { id } = request.params;
        if (typeof id !== "string") {
            return response.status(400).json({
                message: "ID inválido",
            });
        }

        try {
            const assinatura = await planosService.atualizarStatus(
                id,
                request.body.status,
            );
            return response.status(200).json(assinatura);
        } catch (error) {
            return response.status(400).json({
                message:
                    error instanceof Error
                        ? error.message
                        : "Erro ao atualizar status",
            });
        }
    }

    async patchRenovacao(request: Request, response: Response) {
        const { id } = request.params;
        if (typeof id !== "string") {
            return response.status(400).json({
                message: "ID inválido",
            });
        }
        try {
            const assinatura = await planosService.atualizarRenovacao(
                id,
                request.body.renovacao_automatica,
            );
            return response.status(200).json(assinatura);
        } catch (error) {
            return response.status(400).json({
                message:
                    error instanceof Error
                        ? error.message
                        : "Erro ao atualizar renovação",
            });
        }
    }
}

export const planosController = new PlanosController();