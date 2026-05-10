import connection from "./connection.js";

export async function inserirPostit(postit) {
  let comando = `
    INSERT INTO postits (texto, cor)
    VALUES (?, ?)
    `;

  const [resposta] = await connection.query(comando, [
    postit.texto,
    postit.cor,
  ]);

  return resposta.insertId;
}

export async function listarPostits() {
  let comando = `
    SELECT *
    FROM postits
    ORDER BY criado_em DESC
    `;

  const [linhas] = await connection.query(comando);

  return linhas;
}

export async function buscarPorId(id) {
  let comando = `
    SELECT *
    FROM postits
    WHERE id = ?
    `;

  const [linhas] = await connection.query(comando, [id]);

  return linhas[0];
}

export async function alterarPostit(id, postit) {
  let comando = `
    UPDATE postits
    SET texto = ?,
        cor = ?
    WHERE id = ?
    `;

  const [resposta] = await connection.query(comando, [
    postit.texto,
    postit.cor,
    id,
  ]);

  return resposta.affectedRows;
}

export async function deletarPostit(id) {
  let comando = `
    DELETE FROM postits
    WHERE id = ?
    `;

  const [resposta] = await connection.query(comando, [id]);

  return resposta.affectedRows;
}
