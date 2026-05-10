import express from "express";
import "dotenv/config";
import cors from "cors";
import adicionarRotas from "./routes.js";

const api = express();

const corsOptions = {
  origin: [
    "http://localhost:4200",
    "https://navy-blogg.netlify.app",
    process.env.FRONTEND_URL,
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

api.use(cors(corsOptions));
api.use(express.json());

api.get("/", (req, resp) => {
  resp.send("API Navy rodando!");
});

adicionarRotas(api);

const porta = process.env.PORT || process.env.PORTA || 5010;

api.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`));
