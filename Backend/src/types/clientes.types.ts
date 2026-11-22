export interface Cliente {
  id_cliente: string;
  nome: string;
  telefone: string;
  email: string;
  data_nascimento: Date;
  observacoes: string;
  ativo: boolean;
}

export interface CriarCliente {
  nome: string;
  telefone: string;
  email: string;
  data_nascimento: Date;
  observacoes: string;
}