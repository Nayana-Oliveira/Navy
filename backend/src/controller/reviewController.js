import { Router } from "express";
import * as service from "../service/reviewService.js";
import uploadReview from "../utils/uploadReview.js";
import autenticar from "../middlewares/autenticacao.js";
import { uploadImagem } from "../utils/uploadSupabase.js";

const endpoints = Router();

endpoints.post(
  "/reviews",
  autenticar,
  uploadReview.single("imagem"),
  async (req, resp) => {
    try {
      let review = req.body;

      if (req.file) {
        review.imagem = await uploadImagem(req.file, "reviews");
      }

      let id = await service.inserirReview(review);

      resp.status(201).send({
        id: id,
      });
    } catch (err) {
      console.log(err);

      resp.status(400).send({
        erro: err.message || err.detail || String(err),
      });
    }
  },
);

endpoints.get("/reviews", async (req, resp) => {
  try {
    let registros = await service.listarReviews();

    resp.send(registros);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoints.get("/reviews/:id", async (req, resp) => {
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

endpoints.put("/reviews/:id", autenticar, uploadReview.single("imagem"), async (req, resp) => {
    try {
      let id = req.params.id;
      let review = req.body;

      if (req.file) {
        review.imagem = await uploadImagem(req.file, "reviews");
      }

      await service.alterarReview(id, review);

      resp.status(204).send();
    } catch (err) {
      resp.status(400).send({
        erro: err.message,
      });
    }
  },
);

endpoints.delete("/reviews/:id", autenticar, async (req, resp) => {
  try {
    let id = req.params.id;

    await service.deletarReview(id);

    resp.status(204).send();
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

export default endpoints;
