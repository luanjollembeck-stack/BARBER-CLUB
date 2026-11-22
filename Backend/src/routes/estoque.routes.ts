import { Router } from "express";
import { estoqueController } from "../controller/estoque.controller.js";
export const estoqueRouter = Router();

// PRODUTOS

estoqueRouter.get("/", estoqueController.get);
estoqueRouter.post("/", estoqueController.post);
estoqueRouter.get("/:id", estoqueController.getById);
estoqueRouter.patch("/:id", estoqueController.patch);

// MOVIMENTAÇÕES DE ESTOQUE

estoqueRouter.get("/movimentacoes", estoqueController.getMovimentacoes);
estoqueRouter.post("/movimentacoes", estoqueController.postMovimentacao);
estoqueRouter.get("/movimentacoes/produto/:id", estoqueController.getMovimentacoesByProduto);