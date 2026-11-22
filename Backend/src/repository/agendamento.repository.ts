import { knex } from "../database/knex.js";
import type {
    Agendamento,
    CriarAgendamento,
    AgendamentoServico,
    CriarAgendamentoServico,
    Avaliacao,
    CriarAvaliacao
} from "../types/agendamento.types.js";

class AgendamentosRepository {

    // AGENDAMENTOS

    async getAll(): Promise<Agendamento[]> {
        return await knex("agendamentos").select("*");
    }

    async getById(id: string): Promise<Agendamento | undefined> {
        return await knex("agendamentos")
            .where({ id_agendamento: id })
            .first();
    }

    async create(dados: CriarAgendamento): Promise<Agendamento> {
        const [agendamento] = await knex("agendamentos")
            .insert(dados)
            .returning("*");
        if (!agendamento) {
            throw new Error("O banco não retornou o agendamento cadastrado");
        }
        return agendamento;
    }

    async atualizarStatus(id: string, status: string): Promise<boolean> {
        const quantidade = await knex("agendamentos")
            .where({ id_agendamento: id })
            .update({ status });
        return quantidade > 0;
    }

    // SERVIÇOS DO AGENDAMENTO

    async getServicos(id: string): Promise<AgendamentoServico[]> {
        return await knex("agendamento_servicos")
            .where({ id_agendamento: id })
            .select("*");
    }

    async adicionarServico(
        dados: CriarAgendamentoServico
    ): Promise<AgendamentoServico> {
        const [servico] = await knex("agendamento_servicos")
            .insert(dados)
            .returning("*");
        if (!servico) {
            throw new Error("O banco não retornou o serviço do agendamento");
        }
        return servico;
    }

    // AVALIAÇÕES

    async getAvaliacoes(): Promise<Avaliacao[]> {
        return await knex("avaliacoes").select("*");
    }

    async getAvaliacaoByAgendamento(
        id: string
    ): Promise<Avaliacao | undefined> {
        return await knex("avaliacoes")
            .where({ id_agendamento: id })
            .first();
    }

    async criarAvaliacao(dados: CriarAvaliacao): Promise<Avaliacao> {
        const [avaliacao] = await knex("avaliacoes")
            .insert(dados)
            .returning("*");
        if (!avaliacao) {
            throw new Error("O banco não retornou a avaliação cadastrada");
        }
        return avaliacao;
    }
}

export const agendamentosRepository = new AgendamentosRepository();
