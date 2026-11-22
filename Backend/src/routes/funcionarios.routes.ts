
import { Router } from "express";

import { funcionarioController } from "../controller/funcionarios.controller.js";

// FUNCIONARIOS

export const funcionarioRouter = Router();

funcionarioRouter.get("/", funcionarioController.get);
funcionarioRouter.post("/", funcionarioController.post);
funcionarioRouter.get("/:id", funcionarioController.getById);
funcionarioRouter.patch("/:id", funcionarioController.patch);

// HORARIOS

funcionarioRouter.get("/horarios", funcionarioController.getHorarios);
funcionarioRouter.post("/horarios", funcionarioController.postHorario);
funcionarioRouter.patch("/horarios/:id", funcionarioController.patchHorario);

// PRESENCAS

funcionarioRouter.get("/presencas", funcionarioController.getPresencas);
funcionarioRouter.post("/presencas", funcionarioController.postPresenca);
funcionarioRouter.patch("/presencas/:id/saida", funcionarioController.patchPresenca);
