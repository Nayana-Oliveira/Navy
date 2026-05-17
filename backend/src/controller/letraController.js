import { Router } from "express";
import * as service from "../service/letraService.js";
import autenticar from "../middlewares/autenticacao.js";

const endpoints = Router();

endpoints.post("/letras", autenticar, async (req, resp) => {
  try {
    let letra = req.body;

    let id = await service.inserirLetra(letra);

    resp.status(201).send({
      id: id,
    });
  } catch (err) {
    console.log(err);

    resp.status(400).send({
      erro: err.message || err.detail || String(err),
    });
  }
});

endpoints.get("/letras", async (req, resp) => {
  try {
    let registros = await service.listarLetras();

    resp.send(registros);
  } catch (err) {
    console.log(err);

    resp.status(400).send({
      erro: err.message || err.detail || String(err),
    });
  }
});

endpoints.get("/letras/:id", async (req, resp) => {
  try {
    let id = req.params.id;

    let registro = await service.buscarPorId(id);

    resp.send(registro);
  } catch (err) {
    resp.status(404).send({
      erro: err.message,
    });
  }
});

endpoints.put("/letras/:id", autenticar, async (req, resp) => {
  try {
    let id = req.params.id;
    let letra = req.body;

    await service.alterarLetra(id, letra);

    resp.status(204).send();
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoints.delete("/letras/:id", autenticar, async (req, resp) => {
  try {
    let id = req.params.id;

    await service.deletarLetra(id);

    resp.status(204).send();
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

export default endpoints;
