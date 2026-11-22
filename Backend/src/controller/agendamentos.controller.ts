
import { type Request, type Response } from "express";

import { agendamentosService } from "../services/agendamentos.service.js";

class AgendamentosController {

    // AGENDAMENTOS

    async get(request: Request, response: Response) {
        try {
            const agendamentos = await agendamentosService.getAll();
            return response.json(agendamentos);
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: "Erro ao buscar agendamentos"
            });
        }
    }

    async getById(request: Request, response: Response) {
        try {
            const { id } = request.params;
            if (typeof id !== "string") {
                return response.status(400).json({
                    error: "ID do agendamento inválido"
                });
            }
            const agendamento = await agendamentosService.getById(id);
            if (!agendamento) {
                return response.status(404).json({
                    error: "Agendamento não encontrado"
                });
            }
            return response.json(agendamento);
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: "Erro ao buscar agendamento"
            });
        }
    }

    async post(request: Request, response: Response) {
        try {
            const agendamento = await agendamentosService.create(request.body);
            return response.status(201).json(agendamento);
        } catch (error) {
            console.error(error);
            return response.status(400).json({
                error: "Erro ao cadastrar agendamento"
            });
        }
    }

    async patch(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { status } = request.body;
            if (typeof id !== "string") {
                return response.status(400).json({
                    error: "ID do agendamento inválido"
                });
            }

            if (!status) {
                return response.status(400).json({
                    error: "Informe o novo status do agendamento"
                });
            }
            const atualizado = await agendamentosService.atualizarStatus(
                id,
                status
            );
            if (!atualizado) {
                return response.status(404).json({
                    error: "Agendamento não encontrado"
                });
            }
            return response.json({
                message: "Status do agendamento atualizado"
            });
        } catch (error) {
            console.error(error);
            return response.status(400).json({
                error: "Erro ao atualizar agendamento"
            });
        }
    }

    // SERVIÇOS DO AGENDAMENTO

    async getServicos(request: Request, response: Response) {
        try {
            const { id } = request.params;
            if (typeof id !== "string") {
                return response.status(400).json({
                    error: "ID do agendamento inválido"
                });
            }
            const servicos = await agendamentosService.getServicos(id);
            return response.json(servicos);
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: "Erro ao buscar serviços do agendamento"
            });
        }
    }

    async postServico(request: Request, response: Response) {
        try {
            const { id } = request.params;
            if (typeof id !== "string") {
                return response.status(400).json({
                    error: "ID do agendamento inválido"
                });
            }
            const servico = await agendamentosService.adicionarServico({
                ...request.body,
                id_agendamento: id
            });
            return response.status(201).json(servico);
        } catch (error) {
            console.error(error);
            return response.status(400).json({
                error: "Erro ao adicionar serviço ao agendamento"
            });
        }
    }

    // AVALIAÇÕES

    async getAvaliacoes(request: Request, response: Response) {
        try {
            const avaliacoes = await agendamentosService.getAvaliacoes();
            return response.json(avaliacoes);
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: "Erro ao buscar avaliações"
            });
        }
    }

    async postAvaliacao(request: Request, response: Response) {
        try {
            const avaliacao = await agendamentosService.criarAvaliacao(
                request.body
            );
            return response.status(201).json(avaliacao);
        } catch (error) {
            console.error(error);
            return response.status(400).json({
                error: "Erro ao cadastrar avaliação"
            });
        }
    }
}

export const agendamentoController = new AgendamentosController();