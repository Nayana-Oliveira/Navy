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
    console.log(err);
    
    resp.status(400).send({
      erro: err.message || err.detail || String(err),
    });
  }
});

export default endpoints;
