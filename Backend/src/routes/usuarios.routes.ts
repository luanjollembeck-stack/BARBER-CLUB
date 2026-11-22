
import { Router } from "express";

import { usuarioController } from "../controller/usuarios.controller.js";

export const usuarioRouter = Router();

usuarioRouter.post("/login", usuarioController.login);

usuarioRouter.get("/", usuarioController.get);

usuarioRouter.post("/", usuarioController.post);

usuarioRouter.get("/:id", usuarioController.getById);

usuarioRouter.patch("/:id", usuarioController.patch);
