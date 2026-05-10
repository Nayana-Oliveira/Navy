import { Router } from "express";
import * as service from "../service/postService.js";
import upload from "../utils/upload.js";
import autenticar from "../middlewares/autenticacao.js";

const endpoints = Router();

endpoints.post("/posts", autenticar,  upload.single("imagem"), async (req, resp) => {
  try {
    let post = req.body;

    if (req.file) {
      post.imagem = "/public/storage/posts/" + req.file.filename;
    }

    let id = await service.inserirPost(post);

    resp.status(201).send({
      id: id,
    });
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoints.get("/posts", async (req, resp) => {
  try {
    let registros = await service.listarPosts();

    resp.send(registros);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoints.get("/posts/:id", async (req, resp) => {
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

endpoints.put("/posts/:id", autenticar, upload.single("imagem"), async (req, resp) => {
  try {
    let id = req.params.id;

    let post = req.body;

    if (req.file) {
      post.imagem = "/public/storage/posts/" + req.file.filename;
    }

    await service.alterarPost(id, post);

    resp.status(204).send();
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoints.delete("/posts/:id", autenticar, async (req, resp) => {
  try {
    let id = req.params.id;

    await service.deletarPost(id);

    resp.status(204).send();
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

export default endpoints;
