import { Router } from "express";
import * as service from "../service/postitService.js";
import autenticar from "../middlewares/autenticacao.js";

const endpoints = Router();

endpoints.post("/postits", autenticar, async (req, resp) => {
  try {
    let postit = req.body;

    let id = await service.inserirPostit(postit);

    resp.status(201).send({
      id: id,
    });
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoints.get("/postits", async (req, resp) => {
  try {
    let registros = await service.listarPostits();

    resp.send(registros);
  } catch (err) {
    console.log(err);
    
    resp.status(400).send({
      erro: err.message || err.detail || String(err),
    });
  }
});

endpoints.get("/postits/:id", autenticar, async (req, resp) => {
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

endpoints.put("/postits/:id", autenticar, async (req, resp) => {
  try {
    let id = req.params.id;
    let postit = req.body;

    await service.alterarPostit(id, postit);

    resp.status(204).send();
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoints.delete("/postits/:id", autenticar, async (req, resp) => {
  try {
    let id = req.params.id;

    await service.deletarPostit(id);

    resp.status(204).send();
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

export default endpoints;
