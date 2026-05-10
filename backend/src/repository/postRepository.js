import connection from "./connection.js";

export async function inserirPost(post) {
  const comando = `
    INSERT INTO public.posts
    (
      titulo,
      conteudo,
      imagem,
      link_video,
      link_musica,
      link_podcast,
      categoria
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
  `;

  const resposta = await connection.query(comando, [
    post.titulo,
    post.conteudo,
    post.imagem || null,
    post.link_video || null,
    post.link_musica || null,
    post.link_podcast || null,
    post.categoria || null,
  ]);

  return resposta.rows[0].id;
}

export async function listarPosts() {
  const comando = `
    SELECT *
    FROM public.posts
    ORDER BY criado_em DESC
  `;

  const resposta = await connection.query(comando);

  return resposta.rows;
}

export async function buscarPorId(id) {
  const comando = `
    SELECT *
    FROM public.posts
    WHERE id = $1
  `;

  const resposta = await connection.query(comando, [id]);

  return resposta.rows[0];
}

export async function alterarPost(id, post) {
  const comando = `
    UPDATE public.posts
    SET
      titulo = $1,
      conteudo = $2,
      imagem = COALESCE($3, imagem),
      link_video = $4,
      link_musica = $5,
      link_podcast = $6,
      categoria = $7
    WHERE id = $8
  `;

  const resposta = await connection.query(comando, [
    post.titulo,
    post.conteudo,
    post.imagem || null,
    post.link_video || null,
    post.link_musica || null,
    post.link_podcast || null,
    post.categoria || null,
    id,
  ]);

  return resposta.rowCount;
}

export async function deletarPost(id) {
  const comando = `
    DELETE FROM public.posts
    WHERE id = $1
  `;

  const resposta = await connection.query(comando, [id]);

  return resposta.rowCount;
}
