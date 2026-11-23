export interface Marketing {
  id_marketing: string;
  id_funcionario: string | null;
  id_produto: string | null;
  titulo: string;
  descricao: string | null;
  tipo: "barbearia" | "profissional" | "produto" | "trabalho" | "promocao";
  imagem_url: string | null;
  video_url: string | null;
  destaque: boolean;
  ativo: boolean;
  criado_em: Date;
}

export interface CriarMarketing {
  id_funcionario?: string | null;
  id_produto?: string | null;
  titulo: string;
  descricao?: string;
  tipo: "barbearia" | "profissional" | "produto" | "trabalho" | "promocao";
  imagem_url?: string;
  video_url?: string;
  destaque?: boolean;
}

export interface Comodidade {
  id_comodidade: string;
  nome: string;
  descricao: string | null;
  disponivel: boolean;
  imagem_url: string | null;
}

export interface CriarComodidade {
  nome: string;
  descricao?: string;
  disponivel?: boolean;
  imagem_url?: string;
}