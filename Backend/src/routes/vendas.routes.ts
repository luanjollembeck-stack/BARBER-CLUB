import { Router } from "express";
import { vendaController } from "../controller/vendas.controller.js";

export const vendaRouter = Router();

// RESERVAS

vendaRouter.get("/reservas", vendaController.getReservas);
vendaRouter.post("/reservas", vendaController.postReserva);
vendaRouter.get("/reservas/:id", vendaController.getReservaById);
vendaRouter.patch("/reservas/:id", vendaController.patchReserva);

// VENDAS

vendaRouter.get("/", vendaController.get);
vendaRouter.post("/", vendaController.post);
vendaRouter.get("/:id/itens", vendaController.getItens);
vendaRouter.get("/:id", vendaController.getById);
vendaRouter.patch("/:id", vendaController.patch);