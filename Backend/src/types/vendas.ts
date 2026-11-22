export interface Venda {
  id_venda: string;
  id_cliente: string | null;
  id_funcionario: string | null;
  id_agendamento: string | null;
  data_venda: Date;
  valor_total: number;
  desconto: number;
  status: string;
  observacoes: string | null;
}

export interface CriarVenda {
  id_cliente?: string;
  id_funcionario?: string;
  id_agendamento?: string;
  desconto?: number;
  observacoes?: string;
}

export interface ItemVenda {
  id_item_venda: string;
  id_venda: string;
  id_produto: string | null;
  id_servico: string | null;
  quantidade: number;
  preco_unitario: number;
  subtotal: number;
}

export interface CriarItemVenda {
  id_produto?: string;
  id_servico?: string;
  quantidade: number;
  preco_unitario: number;
}

export interface CriarVendaCompleta {
  venda: CriarVenda;
  itens: CriarItemVenda[];
}

export interface ReservaProduto {
  id_reserva: string;
  id_cliente: string;
  id_produto: string;
  id_agendamento: string | null;
  quantidade: number;
  data_reserva: Date;
  data_expiracao: Date | null;
  status: string;
}

export interface CriarReservaProduto {
  id_cliente: string;
  id_produto: string;
  id_agendamento?: string;
  quantidade: number;
  data_expiracao?: Date;
}
