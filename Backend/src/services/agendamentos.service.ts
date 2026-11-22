
import { agendamentosRepository } from "../repository/agendamento.repository.js";

import type {
  CriarAgendamento,
  CriarAgendamentoServico,
  CriarAvaliacao
} from "../types/agendamento.types.js";

class AgendamentosService {

  // AGENDAMENTOS

  async getAll() {
    return await agendamentosRepository.getAll();
  }

  async getById(id: string) {
    return await agendamentosRepository.getById(id);
  }

  async create(dados: CriarAgendamento) {
    return await agendamentosRepository.create(dados);
  }

  async atualizarStatus(id: string, status: string) {
    const agendamento = await agendamentosRepository.getById(id);

    if (!agendamento) {
      throw new Error("Agendamento não encontrado");
    }

    return await agendamentosRepository.atualizarStatus(id, status);
  }

  // SERVIÇOS DO AGENDAMENTO

  async getServicos(id: string) {
    const agendamento = await agendamentosRepository.getById(id);

    if (!agendamento) {
      throw new Error("Agendamento não encontrado");
    }

    return await agendamentosRepository.getServicos(id);
  }

  async adicionarServico(dados: CriarAgendamentoServico) {
    const agendamento = await agendamentosRepository.getById(
      dados.id_agendamento
    );

    if (!agendamento) {
      throw new Error("Agendamento não encontrado");
    }

    return await agendamentosRepository.adicionarServico(dados);
  }

  // AVALIAÇÕES

  async getAvaliacoes() {
    return await agendamentosRepository.getAvaliacoes();
  }

  async criarAvaliacao(dados: CriarAvaliacao) {
    const agendamento = await agendamentosRepository.getById(
      dados.id_agendamento
    );

    if (!agendamento) {
      throw new Error("Agendamento não encontrado");
    }

    if (agendamento.status !== "concluido") {
      throw new Error("Só é possível avaliar um agendamento concluído");
    }

    const avaliacaoExistente =
      await agendamentosRepository.getAvaliacaoByAgendamento(
        dados.id_agendamento
      );

    if (avaliacaoExistente) {
      throw new Error("Esse agendamento já possui uma avaliação");
    }

    if (
      dados.nota_barbeiro < 1 ||
      dados.nota_barbeiro > 5 ||
      dados.nota_estabelecimento < 1 ||
      dados.nota_estabelecimento > 5
    ) {
      throw new Error("As notas devem estar entre 1 e 5");
    }

    return await agendamentosRepository.criarAvaliacao(dados);
  }
}

export const agendamentosService = new AgendamentosService();
