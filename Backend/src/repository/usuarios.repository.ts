
import { knex } from "../database/knex.js";

import type { Usuario, CriarUsuario } from "../types/usuarios.types.js";

class UsuariosRepository {

    async getAll(): Promise<Usuario[]> {
        return await knex("usuarios").select(
            "id_usuario",
            "id_cliente",
            "id_funcionario",
            "email",
            "nivel_acesso",
            "ativo"
        );
    }

    async getById(id: string): Promise<Usuario | undefined> {
        return await knex("usuarios")
            .where({ id_usuario: id })
            .select(
                "id_usuario",
                "id_cliente",
                "id_funcionario",
                "email",
                "nivel_acesso",
                "ativo"
            )
            .first();
    }

    async getByEmail(email: string) {
        return await knex("usuarios")
            .where({ email })
            .first();
    }

    async create(dados: CriarUsuario & { senha_hash: string }): Promise<Usuario> {
        const [usuario] = await knex("usuarios")
            .insert({
                id_cliente: dados.id_cliente ?? null,
                id_funcionario: dados.id_funcionario ?? null,
                email: dados.email,
                senha_hash: dados.senha_hash,
                nivel_acesso: dados.nivel_acesso
            })
            .returning([
                "id_usuario",
                "id_cliente",
                "id_funcionario",
                "email",
                "nivel_acesso",
                "ativo"
            ]);
        if (!usuario) {
            throw new Error("O banco não retornou o usuário cadastrado");
        }

        return usuario;
    }

    async inativarUsuario(id: string): Promise<boolean> {
        const quantidade = await knex("usuarios")
            .where({ id_usuario: id })
            .update({ ativo: false });
        return quantidade > 0;
    }
}

export const usuariosRepository = new UsuariosRepository();
