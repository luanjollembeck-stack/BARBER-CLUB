import jwt from "jsonwebtoken";
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
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            throw new Error("Chave JWT não configurada");
        }
        const token = jwt.sign(
            {
                id_usuario: usuario.id_usuario,
                email: usuario.email,
                nivel_acesso: usuario.nivel_acesso
            },
            JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );
        const { senha_hash, ...usuarioSemSenha } = usuario;
        return {
            usuario: usuarioSemSenha,
            token
        };
    }

    async inativarUsuario(id: string) {
        return await usuariosRepository.inativarUsuario(id);
    }
}

export const usuariosService = new UsuariosService();
