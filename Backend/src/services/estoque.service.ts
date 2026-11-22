import { estoqueRepository } from "../repository/estoque.repository.js";
import type {
    CriarProduto,
    CriarMovimentacaoEstoque
} from "../types/estoque.types.js";

class ProdutosService {

    // PRODUTOS

    async getAll() {
        return await estoqueRepository.getAll();
    }

    async getById(id: string) {
        return await estoqueRepository.getById(id);
    }

    async create(dados: CriarProduto) {
        return await estoqueRepository.create(dados);
    }

    async inativarProduto(id: string) {
        return await estoqueRepository.inativarProduto(id);
    }

    // MOVIMENTAÇÕES

    async getMovimentacoes() {
        return await estoqueRepository.getMovimentacoes();
    }

    async getMovimentacoesByProduto(id: string) {
        return await estoqueRepository.getMovimentacoesByProduto(id);
    }

    async registrarMovimentacao(
        dados: CriarMovimentacaoEstoque
    ) {
        if (dados.quantidade <= 0) {
            throw new Error("A quantidade deve ser maior que zero");
        }
        return await estoqueRepository.registrarMovimentacao(dados);
    }
}

export const produtosService = new ProdutosService();
