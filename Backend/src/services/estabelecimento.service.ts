import type {
    CriarEstabelecimento,
    AtualizarEstabelecimento,
} from "../types/estabelecimento.types.js";
import {
    estabelecimentoRepository,
} from "../repository/estabelecimento.repository.js";

export class EstabelecimentoService {

    async get() {
        return estabelecimentoRepository.get();
    }

    async getById(id: string) {
        const estabelecimento =
            await estabelecimentoRepository.getById(id);
        if (!estabelecimento) {
            throw new Error("Estabelecimento não encontrado");
        }
        return estabelecimento;
    }

    async criar(data: CriarEstabelecimento) {
        if (!data.nome?.trim()) {
            throw new Error("O nome do estabelecimento é obrigatório");
        }
        const existente = await estabelecimentoRepository.get();
        if (existente) {
            throw new Error("O estabelecimento já está cadastrado");
        }
        if (data.latitude !== undefined) {
            if (data.latitude < -90 || data.latitude > 90) {
                throw new Error("Latitude inválida");
            }
        }
        if (data.longitude !== undefined) {
            if (data.longitude < -180 || data.longitude > 180) {
                throw new Error("Longitude inválida");
            }
        }
        return estabelecimentoRepository.criar(data);
    }

    async atualizar(
        id: string,
        data: AtualizarEstabelecimento,
    ) {
        const estabelecimento =
            await estabelecimentoRepository.getById(id);
        if (!estabelecimento) {
            throw new Error("Estabelecimento não encontrado");
        }
        if (data.nome !== undefined && !data.nome.trim()) {
            throw new Error("O nome não pode estar vazio");
        }
        if (data.latitude !== undefined) {
            if (data.latitude < -90 || data.latitude > 90) {
                throw new Error("Latitude inválida");
            }
        }
        if (data.longitude !== undefined) {
            if (data.longitude < -180 || data.longitude > 180) {
                throw new Error("Longitude inválida");
            }
        }
        return estabelecimentoRepository.atualizar(id, data);
    }
}

export const estabelecimentoService =
    new EstabelecimentoService();