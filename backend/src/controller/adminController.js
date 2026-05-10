import { Router } from "express";
import * as service from "../service/adminService.js";
import { generateToken } from "../utils/jwt.js";

const endpoints = Router();

endpoints.post("/admin/login", async (req, resp) => {
  try {
    let login = req.body;

    let admin = await service.login(login.email, login.senha);

    let token = generateToken(admin);

    resp.send({
      token: token,
    });
  } catch (err) {
    resp.status(401).send({
      erro: err.message,
    });
  }
});

export default endpoints;
