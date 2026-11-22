import { Router } from "express";
import { clienteController } from "../controller/clientes.controller.js";

export const clienteRouter = Router();

clienteRouter.get("/", clienteController.get);
clienteRouter.post("/", clienteController.post);
clienteRouter.get("/:id", clienteController.getById);
clienteRouter.patch("/:id", clienteController.patch);