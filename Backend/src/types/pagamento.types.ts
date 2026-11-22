
export interface FormaPagamento {
  id_forma_pagamento: string;
  nome: string;
  ativo: boolean;
}

export interface CriarFormaPagamento {
  nome: string;
}

export interface Pagamento {
  id_pagamento: string;
  id_venda: string;
  id_forma_pagamento: string;
  valor: number;
  data_pagamento: Date;
  status: string;
  observacao: string | null;
}

export interface CriarPagamento {
  id_venda: string;
  id_forma_pagamento: string;
  valor: number;
  observacao?: string;
}
