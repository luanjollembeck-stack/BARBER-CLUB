import { servicosRepository } from "../repository/servicos.repository.js";
import type { CriarServico } from "../types/servicos.types.js";

class ServicosService {

  async getAll() {
    return await servicosRepository.getAll();
  }

  async getById(id: string) {
    return await servicosRepository.getById(id);
  }

  async create(dados: CriarServico) {
    return await servicosRepository.create(dados);
  }

  async inativarServico(id: string) {
    return await servicosRepository.inativarServico(id);
  }
}

export const servicosService = new ServicosService();