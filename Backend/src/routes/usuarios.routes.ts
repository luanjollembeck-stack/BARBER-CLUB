import { Router } from "express";
import { usuarioController } from "../controller/usuarios.controller.js";
import { Auth } from "../middleware/Auth.js";
export const usuarioRouter = Router();

usuarioRouter.post("/login", usuarioController.login);

// Rotas protegidas
usuarioRouter.get("/", Auth, usuarioController.get);
usuarioRouter.post("/", Auth, usuarioController.post);
usuarioRouter.get("/:id", Auth, usuarioController.getById);
usuarioRouter.patch("/:id", Auth, usuarioController.patch);