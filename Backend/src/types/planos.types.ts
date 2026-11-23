export interface Plano {
  id_plano: string;
  nome: string;
  periodo: "mensal" | "trimestral" | "anual";
  preco: number;
  descricao: string | null;
  quantidade_servicos: number | null;
  desconto_produtos: number | null;
  beneficios: string | null;
  ativo: boolean;
}

export interface CriarPlano {
  nome: string;
  periodo: "mensal" | "trimestral" | "anual";
  preco: number;
  descricao?: string;
  quantidade_servicos?: number;
  desconto_produtos?: number;
  beneficios?: string;
}

export interface Assinatura {
  id_assinatura: string;
  id_cliente: string;
  id_plano: string;
  data_inicio: string;
  data_fim: string | null;
  status: "ativa" | "pendente" | "cancelada" | "expirada";
  renovacao_automatica: boolean;
  criado_em: Date;
}

export interface CriarAssinatura {
  id_cliente: string;
  id_plano: string;
  data_inicio: string;
  data_fim?: string;
  renovacao_automatica?: boolean;
}