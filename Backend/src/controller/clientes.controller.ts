import { type Request, type Response } from "express";
import { clientesService } from "../services/clientes.service.js";
import type { CriarCliente } from "../types/clientes.types.js";

class ClientesController {

  async get(_request: Request, response: Response) {
    try {
      const res = await clientesService.getAll();

      return response.json(res);

    } catch (error) {
      console.log(error);

      return response.status(500).json({
        error: "Erro interno"
      });
    }
  }

  async post(
    request: Request<{}, {}, CriarCliente>,
    response: Response
  ) {
    try {
      const dados = request.body;

      const cliente = await clientesService.create(dados);

      return response.status(201).json(cliente);

    } catch (error) {
      console.error(error);

      return response.status(500).json({
        error: "Erro interno"
      });
    }
  }

  async getById(
    request: Request<{ id: string }>,
    response: Response
  ) {
    const { id } = request.params;

    try {
      const res = await clientesService.getById(id);

      return response.json(res);

    } catch (error) {
      console.error(error);

      return response.status(500).json({
        error: "Erro interno"
      });
    }
  }

  async patch(
    request: Request<{ id: string }>,
    response: Response
  ) {
    const { id } = request.params;

    try {
      const res = await clientesService.inativarCliente(id);

      return response.json(res);

    } catch (error) {
      console.error(error);

      return response.status(500).json({
        error: "Erro interno"
      });
    }
  }
}

export const clienteController = new ClientesController();