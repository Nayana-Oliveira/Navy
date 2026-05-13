import connection from "./connection.js";

export async function inserirMusica(musica) {
  const comando = `
    INSERT INTO public.musicas
    (
      titulo,
      artista,
      descricao,
      link,
      mood
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
  `;

  const resposta = await connection.query(comando, [
    musica.titulo,
    musica.artista || null,
    musica.descricao || null,
    musica.link,
    musica.mood || null,
  ]);

  return resposta.rows[0].id;
}

export async function listarMusicas() {
  const comando = `
    SELECT *
    FROM public.musicas
    ORDER BY criado_em DESC
  `;

  const resposta = await connection.query(comando);

  return resposta.rows;
}

export async function buscarPorId(id) {
  const comando = `
    SELECT *
    FROM public.musicas
    WHERE id = $1
  `;

  const resposta = await connection.query(comando, [id]);

  return resposta.rows[0];
}

export async function alterarMusica(id, musica) {
  const comando = `
    UPDATE public.musicas
    SET
      titulo = $1,
      artista = $2,
      descricao = $3,
      link = $4,
      mood = $5
    WHERE id = $6
  `;

  const resposta = await connection.query(comando, [
    musica.titulo,
    musica.artista || null,
    musica.descricao || null,
    musica.link,
    musica.mood || null,
    id,
  ]);

  return resposta.rowCount;
}

export async function deletarMusica(id) {
  const comando = `
    DELETE FROM public.musicas
    WHERE id = $1
  `;

  const resposta = await connection.query(comando, [id]);

  return resposta.rowCount;
}
