import connection from "./connection.js";

export async function inserirReview(review) {
  const comando = `
    INSERT INTO reviews
    (
      titulo,
      tipo,
      nota,
      texto,
      imagem,
      link
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id
  `;

  const resposta = await connection.query(comando, [
    review.titulo,
    review.tipo,
    review.nota,
    review.texto,
    review.imagem || null,
    review.link || null,
  ]);

  return resposta.rows[0].id;
}

export async function listarReviews() {
  const comando = `
    SELECT *
    FROM reviews
    ORDER BY criado_em DESC
  `;

  const resposta = await connection.query(comando);

  return resposta.rows;
}

export async function buscarPorId(id) {
  const comando = `
    SELECT *
    FROM reviews
    WHERE id = $1
  `;

  const resposta = await connection.query(comando, [id]);

  return resposta.rows[0];
}

export async function alterarReview(id, review) {
  const comando = `
    UPDATE reviews
    SET
      titulo = $1,
      tipo = $2,
      nota = $3,
      texto = $4,
      imagem = COALESCE($5, imagem),
      link = $6
    WHERE id = $7
  `;

  const resposta = await connection.query(comando, [
    review.titulo,
    review.tipo,
    review.nota,
    review.texto,
    review.imagem || null,
    review.link || null,
    id,
  ]);

  return resposta.rowCount;
}

export async function deletarReview(id) {
  const comando = `
    DELETE FROM reviews
    WHERE id = $1
  `;

  const resposta = await connection.query(comando, [id]);

  return resposta.rowCount;
}
