import { type Request, type Response } from "express";
import { funcionariosService } from "../services/funcionarios.service.js";
import type { CriarFuncionario, CriarHorario, CriarPresenca } from "../types/funcionarios.types.js";

class FuncionariosController {

    // FUNCIONARIOS
    async get(_request: Request, response: Response) {
        try {
            const res = await funcionariosService.getAll();
            return response.json(res);
        } catch (error) {
            console.log(error);
            return response.status(500).json({
                error: "Erro interno"
            });
        }
    }

    async post(
        request: Request<{}, {}, CriarFuncionario>,
        response: Response
    ) {
        try {
            const dados = request.body;
            const funcionario = await funcionariosService.create(dados);
            return response.status(201).json(funcionario);
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: "Erro interno"
            });
        }
    }

    async getById(
        request: Request<{ id: string }>,
        response: Response
    ) {
        const { id } = request.params;
        try {
            const res = await funcionariosService.getById(id);
            return response.json(res);
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: "Erro interno"
            });
        }
    }

    async patch(
        request: Request<{ id: string }>,
        response: Response
    ) {
        const { id } = request.params;
        try {
            const res = await funcionariosService.inativarFuncionario(id);
            return response.json(res);
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: "Erro interno"
            });
        }
    }

    // HORARIOS

    async getHorarios(_request: Request, response: Response) {
        try {
            const res = await funcionariosService.getHorarios();
            return response.json(res);
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: "Erro interno"
            });
        }
    }

    async postHorario(
        request: Request<{}, {}, CriarHorario>,
        response: Response
    ) {
        try {
            const dados = request.body;
            const horario = await funcionariosService.createHorario(dados);
            return response.status(201).json(horario);

        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: "Erro interno"
            });
        }
    }

    async patchHorario(
        request: Request<{ id: string }>,
        response: Response
    ) {
        const { id } = request.params;
        try {
            const res = await funcionariosService.inativarHorario(id);
            return response.json(res);
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: "Erro interno"
            });
        }
    }

    // PRESENCAS

    async getPresencas(_request: Request, response: Response) {
        try {
            const res = await funcionariosService.getPresencas();
            return response.json(res);
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: "Erro interno"
            });
        }
    }

    async postPresenca(
        request: Request<{}, {}, CriarPresenca>,
        response: Response
    ) {
        try {
            const dados = request.body;
            const presenca = await funcionariosService.registrarEntrada(dados);
            return response.status(201).json(presenca);
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: "Erro interno"
            });
        }
    }

    async patchPresenca(
        request: Request<{ id: string }>,
        response: Response
    ) {
        const { id } = request.params;
        try {
            const res = await funcionariosService.registrarSaida(id);
            return response.json(res);
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: "Erro interno"
            });
        }
    }
}

export const funcionarioController = new FuncionariosController();
