import { Router } from "express";

import { servicoController } from "../controller/servicos.controller.js";

export const servicoRouter = Router();

servicoRouter.get("/", servicoController.get);
servicoRouter.get("/:id", servicoController.getById);
servicoRouter.post("/", servicoController.post);
servicoRouter.patch("/:id", servicoController.patch);