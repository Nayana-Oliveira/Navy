import connection from "./connection.js";

export async function login(email, senha) {
  let comando = `
    SELECT id, email
    FROM admin
    WHERE email = ? AND senha = MD5(?)
    `;

  const [linhas] = await connection.query(comando, [email, senha]);

  return linhas[0];
}
