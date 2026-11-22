import { clientesRepository } from "../repository/clientes.repository.js";
import type { CriarCliente } from "../types/clientes.types.js";

class ClientesService {

    async getAll() {
        return await clientesRepository.getAll();
    }

    async getById(id: string) {
        return await clientesRepository.getById(id);
    }

    async create(dados: CriarCliente) {
        return await clientesRepository.create(dados);
    }

    async inativarCliente(id: string) {
        return await clientesRepository.inativarCliente(id);
    }
}

export const clientesService = new ClientesService();