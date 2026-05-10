import * as repository from "../repository/adminRepository.js";

export async function login(email, senha) {
  if (!email || !senha) {
    throw new Error("Informe email e senha.");
  }

  let admin = await repository.login(email, senha);

  if (!admin) {
    throw new Error("Email ou senha inválidos.");
  }

  return admin;
}
