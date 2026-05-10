import connection from "./connection.js";

export async function inserirReview(review) {
  let comando = `
    INSERT INTO reviews
    (
        titulo,
        tipo,
        nota,
        texto,
        imagem,
        link
    )
    VALUES (?, ?, ?, ?, ?, ?)
    `;

  const [resposta] = await connection.query(comando, [
    review.titulo,
    review.tipo,
    review.nota,
    review.texto,
    review.imagem,
    review.link,
  ]);

  return resposta.insertId;
}

export async function listarReviews() {
  let comando = `
    SELECT *
    FROM reviews
    ORDER BY criado_em DESC
    `;

  const [linhas] = await connection.query(comando);

  return linhas;
}

export async function buscarPorId(id) {
  let comando = `
    SELECT *
    FROM reviews
    WHERE id = ?
    `;

  const [linhas] = await connection.query(comando, [id]);

  return linhas[0];
}

export async function alterarReview(id, review) {
  let comando = `
    UPDATE reviews
    SET
        titulo = ?,
        tipo = ?,
        nota = ?,
        texto = ?,
        imagem = ?,
        link = ?
    WHERE id = ?
    `;

  const [resposta] = await connection.query(comando, [
    review.titulo,
    review.tipo,
    review.nota,
    review.texto,
    review.imagem,
    review.link,
    id,
  ]);

  return resposta.affectedRows;
}

export async function deletarReview(id) {
  let comando = `
    DELETE FROM reviews
    WHERE id = ?
    `;

  const [resposta] = await connection.query(comando, [id]);

  return resposta.affectedRows;
}
