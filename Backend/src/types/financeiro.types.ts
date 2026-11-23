export interface CategoriaFinanceira {
  id_categoria: string;
  nome: string;
  tipo: "entrada" | "saida";
  descricao: string | null;
  ativo: boolean;
}

export interface CriarCategoriaFinanceira {
  nome: string;
  tipo: "entrada" | "saida";
  descricao?: string;
}

export interface MovimentacaoFinanceira {
  id_movimentacao_financeira: string;
  id_categoria: string | null;
  id_funcionario: string | null;
  id_pagamento: string | null;
  descricao: string;
  tipo: "entrada" | "saida";
  valor: number;
  data_movimentacao: Date;
  forma_pagamento: string | null;
  comprovante_url: string | null;
  observacoes: string | null;
}

export interface CriarMovimentacaoFinanceira {
  id_categoria?: string | null;
  id_funcionario?: string | null;
  id_pagamento?: string | null;
  descricao: string;
  tipo: "entrada" | "saida";
  valor: number;
  forma_pagamento?: string;
  comprovante_url?: string;
  observacoes?: string;
}

export interface Transferencia {
  id_transferencia: string;
  banco_origem: string;
  banco_destino: string;
  valor: number;
  data_transferencia: Date;
  descricao: string | null;
  comprovante_url: string | null;
}

export interface CriarTransferencia {
  banco_origem: string;
  banco_destino: string;
  valor: number;
  descricao?: string;
  comprovante_url?: string;
}