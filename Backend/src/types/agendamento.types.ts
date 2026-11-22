
export interface Agendamento {
  id_agendamento: string;
  id_cliente: string;
  id_funcionario: string | null;
  data_agendamento: Date;
  hora_inicio: string;
  hora_fim: string;
  status: string;
  observacoes: string | null;
}

export interface CriarAgendamento {
  id_cliente: string;
  id_funcionario?: string | null;
  data_agendamento: Date;
  hora_inicio: string;
  hora_fim: string;
  status?: string;
  observacoes?: string | null;
}

export interface AgendamentoServico {
  id_agendamento_servico: string;
  id_agendamento: string;
  id_servico: string;
  preco_aplicado: number;
  duracao_aplicada: number;
}

export interface CriarAgendamentoServico {
  id_agendamento: string;
  id_servico: string;
  preco_aplicado: number;
  duracao_aplicada: number;
}

export interface Avaliacao {
  id_avaliacao: string;
  id_agendamento: string;
  id_cliente: string;
  id_funcionario: string | null;
  nota_barbeiro: number;
  comentario_barbeiro: string | null;
  nota_estabelecimento: number;
  comentario_estabelecimento: string | null;
}

export interface CriarAvaliacao {
  id_agendamento: string;
  id_cliente: string;
  id_funcionario?: string | null;
  nota_barbeiro: number;
  comentario_barbeiro?: string | null;
  nota_estabelecimento: number;
  comentario_estabelecimento?: string | null;
}
