export interface Servico {
  id_servico: string;
  nome: string;
  categoria: string;
  descricao: string;
  preco: number;
  duracao_minutos: number;
  ativo: boolean;
}

export interface CriarServico {
  nome: string;
  categoria: string;
  descricao: string;
  preco: number;
  duracao_minutos: number;
}