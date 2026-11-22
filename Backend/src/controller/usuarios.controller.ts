import { type Request, type Response } from "express";
import { usuariosService } from "../services/usuarios.service.js";
import type { CriarUsuario, LoginUsuario } from "../types/usuarios.types.js";

class UsuariosController {

    async get(_request: Request, response: Response) {
        try {
            const res = await usuariosService.getAll();
            return response.json(res);
        } catch (error) {
            console.log(error);
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
            const res = await usuariosService.getById(id);
            if (!res) {
                return response.status(404).json({
                    error: "Usuário não encontrado"
                });
            }

            return response.json(res);
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: "Erro interno"
            });
        }
    }

    async post(
        request: Request<{}, {}, CriarUsuario>,
        response: Response
    ) {
        try {
            const dados = request.body;
            const usuario = await usuariosService.create(dados);
            return response.status(201).json(usuario);
        } catch (error) {
            console.error(error);
            return response.status(400).json({
                error: "Não foi possível cadastrar o usuário"
            });
        }
    }
    async login(
        request: Request<{}, {}, LoginUsuario>,
        response: Response
    ) {
        try {
            const dados = request.body;
            const res = await usuariosService.login(dados);
            return response.json({
                mensagem: "Login realizado com sucesso",
                usuario: res.usuario,
                token: res.token
            });
        } catch (error) {
            console.error(error);
            return response.status(401).json({
                error: "E-mail ou senha incorretos"
            });
        }
    }

    async patch(
        request: Request<{ id: string }>,
        response: Response
    ) {
        const { id } = request.params;
        try {
            const res = await usuariosService.inativarUsuario(id);
            if (!res) {
                return response.status(404).json({
                    error: "Usuário não encontrado"
                });
            }
            return response.json({
                mensagem: "Usuário inativado com sucesso"
            });
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: "Erro interno"
            });
        }
    }
}

export const usuarioController = new UsuariosController();
