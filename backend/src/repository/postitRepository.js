import connection from "./connection.js";

export async function inserirPostit(postit) {
  const comando = `
    INSERT INTO postits (texto, cor)
    VALUES ($1, $2)
    RETURNING id
  `;

  const resposta = await connection.query(comando, [postit.texto, postit.cor]);

  return resposta.rows[0].id;
}

export async function listarPostits() {
  const comando = `
    SELECT *
    FROM postits
    ORDER BY criado_em DESC
  `;

  const resposta = await connection.query(comando);

  return resposta.rows;
}

export async function buscarPorId(id) {
  const comando = `
    SELECT *
    FROM postits
    WHERE id = $1
  `;

  const resposta = await connection.query(comando, [id]);

  return resposta.rows[0];
}

export async function alterarPostit(id, postit) {
  const comando = `
    UPDATE postits
    SET texto = $1,
        cor = $2
    WHERE id = $3
  `;

  const resposta = await connection.query(comando, [
    postit.texto,
    postit.cor,
    id,
  ]);

  return resposta.rowCount;
}

export async function deletarPostit(id) {
  const comando = `
    DELETE FROM postits
    WHERE id = $1
  `;

  const resposta = await connection.query(comando, [id]);

  return resposta.rowCount;
}
