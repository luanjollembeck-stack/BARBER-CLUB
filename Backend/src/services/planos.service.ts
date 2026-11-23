import type {
  CriarPlano,
  CriarAssinatura,
} from "../types/planos.types.js";
import { planosRepository } from "../repository/planos.repository.js";
import { knex } from "../database/knex.js";

export class PlanosService {

  // =============== PLANOS ===============

  async getPlanos() {
    return planosRepository.getPlanos();
  }

  async getPlanoById(id: string) {
    const plano = await planosRepository.getPlanoById(id);

    if (!plano) {
      throw new Error("Plano não encontrado");
    }

    return plano;
  }

  async criarPlano(data: CriarPlano) {
    if (!data.nome?.trim()) {
      throw new Error("O nome do plano é obrigatório");
    }

    if (data.preco < 0 || !Number.isFinite(data.preco)) {
      throw new Error("O preço deve ser igual ou maior que zero");
    }

    const periodosValidos = ["mensal", "trimestral", "anual"];

    if (!periodosValidos.includes(data.periodo)) {
      throw new Error("Período inválido");
    }

    if (
      data.quantidade_servicos !== undefined &&
      data.quantidade_servicos < 0
    ) {
      throw new Error("A quantidade de serviços não pode ser negativa");
    }

    if (
      data.desconto_produtos !== undefined &&
      (data.desconto_produtos < 0 || data.desconto_produtos > 100)
    ) {
      throw new Error("O desconto deve estar entre 0 e 100");
    }

    return planosRepository.criarPlano(data);
  }

  async inativarPlano(id: string) {
    const plano = await planosRepository.getPlanoById(id);

    if (!plano) {
      throw new Error("Plano não encontrado");
    }

    return planosRepository.inativarPlano(id);
  }

  // =============== ASSINATURAS ===============

  async getAssinaturas() {
    return planosRepository.getAssinaturas();
  }

  async getAssinaturaById(id: string) {
    const assinatura = await planosRepository.getAssinaturaById(id);

    if (!assinatura) {
      throw new Error("Assinatura não encontrada");
    }

    return assinatura;
  }

  async getAssinaturasByCliente(id_cliente: string) {
    const cliente = await knex("clientes")
      .where({ id_cliente })
      .first();

    if (!cliente) {
      throw new Error("Cliente não encontrado");
    }

    return planosRepository.getAssinaturasByCliente(id_cliente);
  }

  async criarAssinatura(data: CriarAssinatura) {
    if (!data.id_cliente || !data.id_plano) {
      throw new Error("Cliente e plano são obrigatórios");
    }

    const cliente = await knex("clientes")
      .where({ id_cliente: data.id_cliente, ativo: true })
      .first();

    if (!cliente) {
      throw new Error("Cliente não encontrado ou inativo");
    }

    const plano = await planosRepository.getPlanoById(data.id_plano);

    if (!plano || !plano.ativo) {
      throw new Error("Plano não encontrado ou inativo");
    }

    if (!data.data_inicio) {
      throw new Error("A data de início é obrigatória");
    }

    const dataInicio = new Date(data.data_inicio);

    if (isNaN(dataInicio.getTime())) {
      throw new Error("Data de início inválida");
    }

    if (data.data_fim) {
      const dataFim = new Date(data.data_fim);

      if (isNaN(dataFim.getTime())) {
        throw new Error("Data de término inválida");
      }

      if (dataFim <= dataInicio) {
        throw new Error("A data de término deve ser posterior ao início");
      }
    }

    return planosRepository.criarAssinatura(data);
  }

  async atualizarStatus(
    id: string,
    status: "ativa" | "pendente" | "cancelada" | "expirada",
  ) {
    const assinatura = await planosRepository.getAssinaturaById(id);

    if (!assinatura) {
      throw new Error("Assinatura não encontrada");
    }

    const statusValidos = [
      "ativa",
      "pendente",
      "cancelada",
      "expirada",
    ];

    if (!statusValidos.includes(status)) {
      throw new Error("Status inválido");
    }

    return planosRepository.atualizarStatus(id, status);
  }

  async atualizarRenovacao(
    id: string,
    renovacao_automatica: boolean,
  ) {
    const assinatura = await planosRepository.getAssinaturaById(id);

    if (!assinatura) {
      throw new Error("Assinatura não encontrada");
    }

    if (assinatura.status === "cancelada" || assinatura.status === "expirada") {
      throw new Error("Não é possível alterar uma assinatura encerrada");
    }

    return planosRepository.atualizarRenovacao(
      id,
      renovacao_automatica,
    );
  }
}

export const planosService = new PlanosService();