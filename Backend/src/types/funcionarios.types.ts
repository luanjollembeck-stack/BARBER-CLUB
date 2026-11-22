export interface Funcionario {
  id_funcionario: string;
  nome: string;
  telefone: string;
  email: string;
  cargo: string;
  especialidade: string;
  salario: number;
  data_contratacao: Date;
  ativo: boolean;
}

export interface CriarFuncionario {
  nome: string;
  telefone: string;
  email: string;
  cargo: string;
  especialidade: string;
  salario: number;
  data_contratacao: Date;
}

export interface HorarioFuncionario {
  id_horario: string;
  id_funcionario: string;
  dia_semana: number;
  hora_inicio: string;
  hora_fim: string;
  intervalo_inicio: string;
  intervalo_fim: string;
  ativo: boolean;
}

export interface CriarHorario {
  id_funcionario: string;
  dia_semana: number;
  hora_inicio: string;
  hora_fim: string;
  intervalo_inicio: string;
  intervalo_fim: string;
}

export interface Presenca {
  id_presenca: string;
  id_funcionario: string;
  entrada: Date;
  saida: Date | null;
  observacao: string;
}

export interface CriarPresenca {
  id_funcionario: string;
  observacao: string;
}
