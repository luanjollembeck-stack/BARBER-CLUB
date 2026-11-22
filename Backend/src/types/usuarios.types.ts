export interface Usuario {
  id_usuario: string;
  id_cliente: string | null;
  id_funcionario: string | null;
  email: string;
  nivel_acesso: string;
  ativo: boolean;
}

export interface CriarUsuario {
  id_cliente?: string;
  id_funcionario?: string;
  email: string;
  senha: string;
  nivel_acesso: string;
}

export interface LoginUsuario {
  email: string;
  senha: string;
}
