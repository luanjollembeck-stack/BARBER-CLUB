import { Router } from "express";
import { marketingController } from "../controller/marketing.controller.js";

export const marketingRouter = Router();

// MARKETING

marketingRouter.get("/destaques",marketingController.getDestaques,);

marketingRouter.get("/",marketingController.get,);
marketingRouter.post("/",marketingController.post,);
marketingRouter.get("/:id",marketingController.getById,);
marketingRouter.patch("/:id",marketingController.patch,);

// COMODIDADES

marketingRouter.get("/comodidades",marketingController.getComodidades,);
marketingRouter.post("/comodidades",marketingController.postComodidade,);
marketingRouter.get("/comodidades/:id",marketingController.getComodidadeById,);
marketingRouter.patch("/comodidades/:id",marketingController.patchComodidade,);