import { Router } from "express";
import { pagamentoController } from "../controller/pagamentos.controller.js";

export const pagamentoRouter = Router();

// FORMAS DE PAGAMENTO
pagamentoRouter.get("/formas", pagamentoController.getFormas);
pagamentoRouter.post("/formas", pagamentoController.postForma);
pagamentoRouter.get("/formas/:id", pagamentoController.getFormaById);
pagamentoRouter.patch("/formas/:id", pagamentoController.patchForma);

// PAGAMENTOS
pagamentoRouter.get("/venda/:id", pagamentoController.getByVenda);
pagamentoRouter.get("/", pagamentoController.get);
pagamentoRouter.post("/", pagamentoController.post);
pagamentoRouter.get("/:id", pagamentoController.getById);
pagamentoRouter.patch("/:id", pagamentoController.patch);
