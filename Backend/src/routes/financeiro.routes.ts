import { Router } from "express";
import { financeiroController } from "../controller/financeiro.controller.js";

export const financeiroRouter = Router();

// ================= CATEGORIAS =================
financeiroRouter.get("/categorias", financeiroController.getCategorias.bind(financeiroController),);
financeiroRouter.post("/categorias", financeiroController.postCategoria.bind(financeiroController),);
financeiroRouter.get("/categorias/:id", financeiroController.getCategoriaById.bind(financeiroController),);
financeiroRouter.patch("/categorias/:id", financeiroController.patchCategoria.bind(financeiroController),);

// ================= MOVIMENTAÇÕES =================
financeiroRouter.get("/movimentacoes", financeiroController.getMovimentacoes.bind(financeiroController),);
financeiroRouter.post("/movimentacoes", financeiroController.postMovimentacao.bind(financeiroController),);
financeiroRouter.get("/movimentacoes/:id", financeiroController.getMovimentacaoById.bind(financeiroController),);

// ================= TRANSFERÊNCIAS =================
financeiroRouter.get("/transferencias", financeiroController.getTransferencias.bind(financeiroController),);
financeiroRouter.post("/transferencias", financeiroController.postTransferencia.bind(financeiroController),);
financeiroRouter.get("/transferencias/:id", financeiroController.getTransferenciaById.bind(financeiroController),);