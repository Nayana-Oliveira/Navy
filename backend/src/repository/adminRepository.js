import connection from "./connection.js";

export async function login(email, senha) {
  const comando = `
    SELECT id, email
    FROM admin
    WHERE email = $1 AND senha = MD5($2)
  `;

  const resposta = await connection.query(comando, [email, senha]);

  return resposta.rows[0];
}
