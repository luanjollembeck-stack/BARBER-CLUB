export interface Produto {
  id_produto: string;
  nome: string;
  descricao: string | null;
  categoria: string | null;
  tipo: string;
  preco_venda: number;
  custo: number;
  estoque: number;
  estoque_minimo: number;
  unidade: string | null;
  imagem_url: string | null;
  ativo: boolean;
}

export interface CriarProduto {
  nome: string;
  descricao?: string;
  categoria?: string;
  tipo: string;
  preco_venda: number;
  custo: number;
  estoque: number;
  estoque_minimo: number;
  unidade?: string;
  imagem_url?: string;
}

export interface MovimentacaoEstoque {
  id_movimentacao: string;
  id_produto: string;
  id_funcionario: string | null;
  id_venda: string | null;
  tipo: string;
  quantidade: number;
  data_movimentacao: Date;
  motivo: string | null;
}

export interface CriarMovimentacaoEstoque {
  id_produto: string;
  id_funcionario?: string;
  id_venda?: string;
  tipo: string;
  quantidade: number;
  motivo?: string;
}
