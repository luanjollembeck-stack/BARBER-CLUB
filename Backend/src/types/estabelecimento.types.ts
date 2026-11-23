export interface Estabelecimento {
  id_estabelecimento: string;
  nome: string;
  telefone: string | null;
  email: string | null;
  endereco: string | null;
  numero: string | null;
  bairro: string | null;
  cidade: string | null;
  estado: string | null;
  cep: string | null;
  latitude: number | null;
  longitude: number | null;
  google_maps_url: string | null;
  waze_url: string | null;
  horario_funcionamento: string | null;
  descricao: string | null;
}

export interface CriarEstabelecimento {
  nome: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  latitude?: number;
  longitude?: number;
  google_maps_url?: string;
  waze_url?: string;
  horario_funcionamento?: string;
  descricao?: string;
}

export interface AtualizarEstabelecimento {
  nome?: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  latitude?: number;
  longitude?: number;
  google_maps_url?: string;
  waze_url?: string;
  horario_funcionamento?: string;
  descricao?: string;
} 