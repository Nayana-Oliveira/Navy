import express from 'express';

import adminController from "./controller/adminController.js";
import postController from "./controller/postController.js";
import reviewController from "./controller/reviewController.js";
import postitController from "./controller/postitController.js";
import musicaController from "./controller/musicaController.js";
import letraController from "./controller/letraController.js";

export default function adicionarRotas(api) {
  api.use(adminController);
  api.use(postController);
  api.use(reviewController);
  api.use(postitController);
  api.use(musicaController);
  api.use(letraController);

  api.use("/public/storage/postits", express.static("public/storage/postits"));
  api.use("/public/storage/posts", express.static("public/storage/posts"));
  api.use("/public/storage/profile", express.static("public/storage/profile"));
  api.use("/public/storage/reviews", express.static("public/storage/reviews"));
}