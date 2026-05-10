import connection from "./connection.js";

export async function inserirPost(post) {
  let comando = `
    INSERT INTO posts
    (
        titulo,
        conteudo,
        imagem,
        link_video,
        link_musica,
        link_podcast,
        categoria
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

  const [resposta] = await connection.query(comando, [
    post.titulo,
    post.conteudo,
    post.imagem,
    post.link_video,
    post.link_musica,
    post.link_podcast,
    post.categoria,
  ]);

  return resposta.insertId;
}

export async function listarPosts() {
  let comando = `
    SELECT *
    FROM posts
    ORDER BY criado_em DESC
    `;

  const [linhas] = await connection.query(comando);

  return linhas;
}

export async function buscarPorId(id) {
  let comando = `
    SELECT *
    FROM posts
    WHERE id = ?
    `;

  const [linhas] = await connection.query(comando, [id]);

  return linhas[0];
}

export async function alterarPost(id, post) {
  let comando = `
    UPDATE posts
    SET
        titulo = ?,
        conteudo = ?,
        imagem = ?,
        link_video = ?,
        link_musica = ?,
        link_podcast = ?,
        categoria = ?
    WHERE id = ?
    `;

  const [resposta] = await connection.query(comando, [
    post.titulo,
    post.conteudo,
    post.imagem,
    post.link_video,
    post.link_musica,
    post.link_podcast,
    post.categoria,
    id,
  ]);

  return resposta.affectedRows;
}

export async function deletarPost(id) {
  let comando = `
    DELETE FROM posts
    WHERE id = ?
    `;

  const [resposta] = await connection.query(comando, [id]);

  return resposta.affectedRows;
}
