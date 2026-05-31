import connection from "./connection.js";

export async function inserirLetra(letra) {
  const comando = `
INSERT INTO public.letras
(
  musica,
  artista,
  album,
  trecho,
  cor
)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id
  `;

  const resposta = await connection.query(comando, [
    letra.musica,
    letra.artista || null,
    letra.album || null,
    letra.trecho,
    letra.cor || "#8d9a87",
  ]);

  return resposta.rows[0].id;
}

export async function listarLetras() {
  const comando = `
    SELECT *
    FROM public.letras
    ORDER BY criado_em DESC
  `;

  const resposta = await connection.query(comando);

  return resposta.rows;
}

export async function buscarPorId(id) {
  const comando = `
    SELECT *
    FROM public.letras
    WHERE id = $1
  `;

  const resposta = await connection.query(comando, [id]);

  return resposta.rows[0];
}

export async function alterarLetra(id, letra) {
  const comando = `
    UPDATE public.letras
    SET
      musica = $1,
      artista = $2,
      album = $3,
      trecho = $4,
      letra = $5,
      cor = $6
    WHERE id = $7
  `;

  const resposta = await connection.query(comando, [
    letra.musica,
    letra.artista || null,
    letra.album || null,
    letra.trecho,
    letra.letra,
    letra.cor || "#8d9a87",
    id,
  ]);

  return resposta.rowCount;
}

export async function deletarLetra(id) {
  const comando = `
    DELETE FROM public.letras
    WHERE id = $1
  `;

  const resposta = await connection.query(comando, [id]);

  return resposta.rowCount;
}
