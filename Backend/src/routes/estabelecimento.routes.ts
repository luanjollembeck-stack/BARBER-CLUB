import { Router } from "express";
import { estabelecimentoController } from "../controller/estabelecimento.controller.js";

export const estabelecimentoRouter = Router();

estabelecimentoRouter.get("/", estabelecimentoController.get,);
estabelecimentoRouter.post("/", estabelecimentoController.post,);
estabelecimentoRouter.get("/:id", estabelecimentoController.getById,);
estabelecimentoRouter.patch("/:id", estabelecimentoController.patch,);