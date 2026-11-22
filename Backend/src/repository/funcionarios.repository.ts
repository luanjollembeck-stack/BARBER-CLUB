
import { knex } from "../database/knex.js";

import type { Funcionario, CriarFuncionario, HorarioFuncionario, CriarHorario, Presenca, CriarPresenca } from "../types/funcionarios.types.js";

class FuncionariosRepository {

    // FUNCIONARIOS

    async getAll(): Promise<Funcionario[]> {
        return await knex("funcionarios").where({ ativo: true }).select("*");
    }

    async getById(id: string): Promise<Funcionario[]> {
        return await knex("funcionarios").where({ id_funcionario: id }).select("*");
    }

    async create(dados: CriarFuncionario): Promise<Funcionario> {
        const [funcionario] = await knex("funcionarios").insert(dados).returning("*");

        if (!funcionario) {
            throw new Error("O banco não retornou o funcionário cadastrado");
        }

        return funcionario;
    }

    async inativarFuncionario(id: string): Promise<boolean> {
        const quantidade = await knex("funcionarios").where({ id_funcionario: id }).update({ ativo: false });

        return quantidade > 0;
    }

    // HORARIOS

    async getHorarios(): Promise<HorarioFuncionario[]> {
        return await knex("horarios_funcionarios").where({ ativo: true }).select("*");
    }

    async createHorario(dados: CriarHorario): Promise<HorarioFuncionario> {
        const [horario] = await knex("horarios_funcionarios").insert(dados).returning("*");

        if (!horario) {
            throw new Error("O banco não retornou o horário cadastrado");
        }

        return horario;
    }

    async inativarHorario(id: string): Promise<boolean> {
        const quantidade = await knex("horarios_funcionarios").where({ id_horario: id }).update({ ativo: false });

        return quantidade > 0;
    }

    // PRESENCAS

    async getPresencas(): Promise<Presenca[]> {
        return await knex("presencas").select("*");
    }

    async registrarEntrada(dados: CriarPresenca): Promise<Presenca> {
        const [presenca] = await knex("presencas").insert(dados).returning("*");

        if (!presenca) {
            throw new Error("O banco não retornou a presença registrada");
        }

        return presenca;
    }

    async registrarSaida(id: string): Promise<boolean> {
        const quantidade = await knex("presencas").where({ id_presenca: id }).whereNull("saida").update({ saida: knex.fn.now() });

        return quantidade > 0;
    }
}

export const funcionariosRepository = new FuncionariosRepository();
