import { Router } from "express";
import { agendamentoController } from "../controller/agendamentos.controller.js";
import {  Auth } from "../middleware/Auth.js";
export const agendamentoRouter = Router();

// AVALIAÇÕES
agendamentoRouter.get("/avaliacoes", Auth, agendamentoController.getAvaliacoes);
agendamentoRouter.post("/avaliacoes", Auth, agendamentoController.postAvaliacao);

// SERVIÇOS DO AGENDAMENTO
agendamentoRouter.get("/:id/servicos", Auth, agendamentoController.getServicos);
agendamentoRouter.post("/:id/servicos", Auth, agendamentoController.postServico);

// AGENDAMENTOS
agendamentoRouter.get("/", Auth, agendamentoController.get);
agendamentoRouter.post("/", Auth, agendamentoController.post);
agendamentoRouter.get("/:id", Auth, agendamentoController.getById);
agendamentoRouter.patch("/:id", Auth, agendamentoController.patch);
