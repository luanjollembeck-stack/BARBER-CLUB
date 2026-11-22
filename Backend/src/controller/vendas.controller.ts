import { type Request, type Response } from "express";
import { vendasService } from "../services/vendas.service.js";

class VendasController {

    // VENDAS

    async get(request: Request, response: Response) {
        try {
            const vendas = await vendasService.getAll();
            return response.json(vendas);
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: "Erro ao buscar vendas"
            });
        }
    }

    async getById(request: Request, response: Response) {
        try {
            const { id } = request.params;
            if (typeof id !== "string") {
                return response.status(400).json({
                    error: "ID da venda inválido"
                });
            }
            const venda = await vendasService.getById(id);
            if (!venda) {
                return response.status(404).json({
                    error: "Venda não encontrada"
                });
            }
            return response.json(venda);
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: "Erro ao buscar venda"
            });
        }
    }

    async getItens(request: Request, response: Response) {
        try {
            const { id } = request.params;
            if (typeof id !== "string") {
                return response.status(400).json({
                    error: "ID da venda inválido"
                });
            }
            const itens = await vendasService.getItens(id);
            return response.json(itens);
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: "Erro ao buscar itens da venda"
            });
        }
    }

    async post(request: Request, response: Response) {
        try {
            const venda = await vendasService.create(request.body);
            return response.status(201).json(venda);
        } catch (error) {
            console.error(error);
            return response.status(400).json({
                error: error instanceof Error
                    ? error.message
                    : "Erro ao cadastrar venda"
            });
        }
    }

    async patch(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { status } = request.body;
            if (typeof id !== "string") {
                return response.status(400).json({
                    error: "ID da venda inválido"
                });
            }
            if (!status) {
                return response.status(400).json({
                    error: "Informe o status da venda"
                });
            }
            const atualizado = await vendasService.atualizarStatus(
                id,
                status
            );
            if (!atualizado) {
                return response.status(404).json({
                    error: "Venda não encontrada"
                });
            }
            return response.json({
                message: "Status da venda atualizado"
            });
        } catch (error) {
            console.error(error);
            return response.status(400).json({
                error: error instanceof Error
                    ? error.message
                    : "Erro ao atualizar venda"
            });
        }
    }

    // RESERVAS

    async getReservas(request: Request, response: Response) {
        try {
            const reservas = await vendasService.getReservas();
            return response.json(reservas);
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: "Erro ao buscar reservas"
            });
        }
    }

    async getReservaById(request: Request, response: Response) {
        try {
            const { id } = request.params;
            if (typeof id !== "string") {
                return response.status(400).json({
                    error: "ID da reserva inválido"
                });
            }
            const reserva = await vendasService.getReservaById(id);
            if (!reserva) {
                return response.status(404).json({
                    error: "Reserva não encontrada"
                });
            }
            return response.json(reserva);
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: "Erro ao buscar reserva"
            });
        }
    }

    async postReserva(request: Request, response: Response) {
        try {
            const reserva = await vendasService.createReserva(request.body);
            return response.status(201).json(reserva);
        } catch (error) {
            console.error(error);
            return response.status(400).json({
                error: error instanceof Error
                    ? error.message
                    : "Erro ao cadastrar reserva"
            });
        }
    }

    async patchReserva(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { status } = request.body;
            if (typeof id !== "string") {
                return response.status(400).json({
                    error: "ID da reserva inválido"
                });
            }
            if (!status) {
                return response.status(400).json({
                    error: "Informe o status da reserva"
                });
            }
            const atualizado = await vendasService.atualizarReserva(
                id,
                status
            );
            if (!atualizado) {
                return response.status(404).json({
                    error: "Reserva não encontrada ou não pode ser alterada"
                });
            }
            return response.json({
                message: "Reserva atualizada com sucesso"
            });
        } catch (error) {
            console.error(error);
            return response.status(400).json({
                error: error instanceof Error
                    ? error.message
                    : "Erro ao atualizar reserva"
            });
        }
    }
}

export const vendaController = new VendasController();
