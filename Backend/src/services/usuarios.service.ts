
import bcrypt from "bcryptjs";

import { usuariosRepository } from "../repository/usuarios.repository.js";

import type { CriarUsuario, LoginUsuario } from "../types/usuarios.types.js";

class UsuariosService {

    async getAll() {
        return await usuariosRepository.getAll();
    }
    async getById(id: string) {
        return await usuariosRepository.getById(id);
    }

    async create(dados: CriarUsuario) {
        const usuarioExistente = await usuariosRepository.getByEmail(dados.email);
        if (usuarioExistente) {
            throw new Error("E-mail já cadastrado");
        }
        const senha_hash = await bcrypt.hash(dados.senha, 10);
        return await usuariosRepository.create({
            ...dados,
            senha_hash
        });
    }

    async login(dados: LoginUsuario) {
        const usuario = await usuariosRepository.getByEmail(dados.email);
        if (!usuario || !usuario.ativo) {
            throw new Error("E-mail ou senha incorretos");
        }
        const senhaCorreta = await bcrypt.compare(
            dados.senha,
            usuario.senha_hash
        );
        if (!senhaCorreta) {
            throw new Error("E-mail ou senha incorretos");
        }
        const { senha_hash, ...usuarioSemSenha } = usuario;
        return usuarioSemSenha;
    }

    async inativarUsuario(id: string) {
        return await usuariosRepository.inativarUsuario(id);
    }
}

export const usuariosService = new UsuariosService();
