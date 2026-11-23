import { Router } from "express";
import { planosController } from "../controller/planos.controller.js";

export const planosRouter = Router();

// PLANOS
planosRouter.get("/", planosController.getPlanos,);
planosRouter.post("/", planosController.postPlano,);
planosRouter.get("/:id", planosController.getPlanoById,);
planosRouter.patch("/:id", planosController.patchPlano,);

// ASSINATURAS

planosRouter.get("/assinaturas", planosController.getAssinaturas,);
planosRouter.post("/assinaturas", planosController.postAssinatura,);
planosRouter.get("/assinaturas/cliente/:id", planosController.getAssinaturasByCliente,);
planosRouter.get("/assinaturas/:id", planosController.getAssinaturaById,);
planosRouter.patch("/assinaturas/:id/status", planosController.patchStatus,);
planosRouter.patch("/assinaturas/:id/renovacao", planosController.patchRenovacao,);