import { type Request, type Response } from "express";

import { servicosService } from "../services/servicos.service.js";

import { CriarServico } from "../types/servicos.js";

class ServicosController {

  async get(_request: Request, response: Response) {
    try {
      const res = await servicosService.getAll();

      return response.json(res);

    } catch (error) {
      console.log(error);

      return response.status(500).json({
        error: "Erro interno"
      });
    }
  }

  async post(
    request: Request<{}, {}, CriarServico>,
    response: Response
  ) {
    try {
      const dados = request.body;

      const servico = await servicosService.create(dados);

      return response.status(201).json(servico);

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
      const res = await servicosService.getById(id);

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
      const res = await servicosService.inativarServico(id);

      return response.json(res);

    } catch (error) {
      console.error(error);

      return response.status(500).json({
        error: "Erro interno"
      });
    }
  }
}

export const servicoController = new ServicosController();