import { Router } from "express";
import * as service from "../service/musicaService.js";
import autenticar from "../middlewares/autenticacao.js";

const endpoints = Router();

endpoints.post("/musicas", autenticar, async (req, resp) => {
  try {
    let musica = req.body;

    let id = await service.inserirMusica(musica);

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

endpoints.get("/musicas", async (req, resp) => {
  try {
    let registros = await service.listarMusicas();

    resp.send(registros);
  } catch (err) {
    console.log(err);

    resp.status(400).send({
      erro: err.message || err.detail || String(err),
    });
  }
});

endpoints.get("/musicas/:id", async (req, resp) => {
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

endpoints.put("/musicas/:id", autenticar, async (req, resp) => {
  try {
    let id = req.params.id;

    let musica = req.body;

    await service.alterarMusica(id, musica);

    resp.status(204).send();
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoints.delete("/musicas/:id", autenticar, async (req, resp) => {
  try {
    let id = req.params.id;

    await service.deletarMusica(id);

    resp.status(204).send();
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

export default endpoints;
