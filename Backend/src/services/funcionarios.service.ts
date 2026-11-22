
import { funcionariosRepository } from "../repository/funcionarios.repository.js";

import type { CriarFuncionario, CriarHorario, CriarPresenca } from "../types/funcionarios.types.js";

class FuncionariosService {

    // FUNCIONARIOS

    async getAll() {
        return await funcionariosRepository.getAll();
    }

    async getById(id: string) {
        return await funcionariosRepository.getById(id);
    }

    async create(dados: CriarFuncionario) {
        return await funcionariosRepository.create(dados);
    }

    async inativarFuncionario(id: string) {
        return await funcionariosRepository.inativarFuncionario(id);
    }

    // HORARIOS

    async getHorarios() {
        return await funcionariosRepository.getHorarios();
    }

    async createHorario(dados: CriarHorario) {
        return await funcionariosRepository.createHorario(dados);
    }

    async inativarHorario(id: string) {
        return await funcionariosRepository.inativarHorario(id);
    }

    // PRESENCAS

    async getPresencas() {
        return await funcionariosRepository.getPresencas();
    }

    async registrarEntrada(dados: CriarPresenca) {
        return await funcionariosRepository.registrarEntrada(dados);
    }

    async registrarSaida(id: string) {
        return await funcionariosRepository.registrarSaida(id);
    }
}

export const funcionariosService = new FuncionariosService();
