import express from "express";
import "dotenv/config";
import cors from "cors";
import adicionarRotas from "./routes.js";

const api = express();

api.use(express.json());

api.use(
  cors({
    origin: ["http://localhost:4200", process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

api.get("/", (req, resp) => {
  resp.send("API Navy rodando!");
});

adicionarRotas(api);

const porta = process.env.PORT || process.env.PORTA || 5010;

api.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`));
