import express, { response, type Request, type Response } from "express";
import { servicoRouter } from "./routes/servicos.routes.js";
import { clienteRouter } from "./routes/clientes.routes.js";

const app = express();
const port = 3000

app.use(express.json());

app.use("/servicos", servicoRouter);

app.use("/clientes", clienteRouter);

app.get("health", (req: Request, res: Response) => {
    return response.json({
        status: "ok",
    })
}) 

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
})