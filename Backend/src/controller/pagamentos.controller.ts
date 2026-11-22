import { type Request, type Response } from "express";
import { pagamentosService } from "../services/pagamento.service.js";

class PagamentosController {

    // FORMAS DE PAGAMENTO

    async getFormas(request: Request, response: Response) {
        try {
            const formas = await pagamentosService.getFormas();
            return response.json(formas);
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: "Erro ao buscar formas de pagamento"
            });
        }
    }

    async getFormaById(request: Request, response: Response) {
        try {
            const { id } = request.params;
            if (typeof id !== "string") {
                return response.status(400).json({
                    error: "ID da forma de pagamento inválido"
                });
            }

            const forma = await pagamentosService.getFormaById(id);
            if (!forma) {
                return response.status(404).json({
                    error: "Forma de pagamento não encontrada"
                });
            }
            return response.json(forma);
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: "Erro ao buscar forma de pagamento"
            });
        }
    }

    async postForma(request: Request, response: Response) {
        try {
            const forma = await pagamentosService.createForma(request.body);
            return response.status(201).json(forma);
        } catch (error) {
            console.error(error);
            return response.status(400).json({
                error: error instanceof Error
                    ? error.message
                    : "Erro ao cadastrar forma de pagamento"
            });
        }
    }

    async patchForma(request: Request, response: Response) {
        try {
            const { id } = request.params;
            if (typeof id !== "string") {
                return response.status(400).json({
                    error: "ID da forma de pagamento inválido"
                });
            }
            const inativada = await pagamentosService.inativarForma(id);
            if (!inativada) {
                return response.status(404).json({
                    error: "Forma de pagamento não encontrada"
                });
            }
            return response.json({
                message: "Forma de pagamento inativada com sucesso"
            });
        } catch (error) {
            console.error(error);
            return response.status(400).json({
                error: "Erro ao inativar forma de pagamento"
            });
        }
    }

    // PAGAMENTOS

    async get(request: Request, response: Response) {
        try {
            const pagamentos = await pagamentosService.getAll();
            return response.json(pagamentos);
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: "Erro ao buscar pagamentos"
            });
        }
    }

    async getById(request: Request, response: Response) {
        try {
            const { id } = request.params;
            if (typeof id !== "string") {
                return response.status(400).json({
                    error: "ID do pagamento inválido"
                });
            }
            const pagamento = await pagamentosService.getById(id);
            if (!pagamento) {
                return response.status(404).json({
                    error: "Pagamento não encontrado"
                });
            }
            return response.json(pagamento);
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: "Erro ao buscar pagamento"
            });
        }
    }

    async getByVenda(request: Request, response: Response) {
        try {
            const { id } = request.params;

            if (typeof id !== "string") {
                return response.status(400).json({
                    error: "ID da venda inválido"
                });
            }

            const pagamentos = await pagamentosService.getByVenda(id);

            return response.json(pagamentos);

        } catch (error) {
            console.error(error);

            return response.status(500).json({
                error: "Erro ao buscar pagamentos da venda"
            });
        }
    }

    async post(request: Request, response: Response) {
        try {
            const pagamento = await pagamentosService.create(request.body);

            return response.status(201).json(pagamento);

        } catch (error) {
            console.error(error);

            return response.status(400).json({
                error: error instanceof Error
                    ? error.message
                    : "Erro ao cadastrar pagamento"
            });
        }
    }

    async patch(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { status } = request.body;

            if (typeof id !== "string") {
                return response.status(400).json({
                    error: "ID do pagamento inválido"
                });
            }

            if (!status) {
                return response.status(400).json({
                    error: "Informe o status do pagamento"
                });
            }

            const atualizado = await pagamentosService.atualizarStatus(
                id,
                status
            );

            if (!atualizado) {
                return response.status(404).json({
                    error: "Pagamento não encontrado"
                });
            }

            return response.json({
                message: "Status do pagamento atualizado com sucesso"
            });

        } catch (error) {
            console.error(error);

            return response.status(400).json({
                error: error instanceof Error
                    ? error.message
                    : "Erro ao atualizar pagamento"
            });
        }
    }
}

export const pagamentoController = new PagamentosController();
