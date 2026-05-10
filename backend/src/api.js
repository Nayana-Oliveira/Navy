import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import adicionarRotas from './routes.js';

const api = express();

api.use(express.json());
api.use(cors());

adicionarRotas(api)

const porta = process.env.PORT || process.env.PORTA || 5010;
api.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`));