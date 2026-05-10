import jwt from "jsonwebtoken";

export default function autenticar(req, resp, next) {
  try {
    let token = req.headers.authorization;

    if (!token) {
      throw new Error("Token não informado.");
    }

    token = token.replace("Bearer ", "");

    let usuario = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = usuario;

    next();
  } catch (err) {
    resp.status(401).send({
      erro: err.message,
    });
  }
}
