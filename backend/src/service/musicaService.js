import * as repository from "../repository/musicaRepository.js";

export async function inserirMusica(musica) {
  if (!musica.titulo) {
    throw new Error("Título obrigatório.");
  }

  if (!musica.link) {
    throw new Error("Link obrigatório.");
  }

  return await repository.inserirMusica(musica);
}

export async function listarMusicas() {
  return await repository.listarMusicas();
}

export async function buscarPorId(id) {
  let registro = await repository.buscarPorId(id);

  if (!registro) {
    throw new Error("Música não encontrada.");
  }

  return registro;
}

export async function alterarMusica(id, musica) {
  let linhas = await repository.alterarMusica(id, musica);

  if (linhas === 0) {
    throw new Error("Música não encontrada.");
  }
}

export async function deletarMusica(id) {
  let linhas = await repository.deletarMusica(id);

  if (linhas === 0) {
    throw new Error("Música não encontrada.");
  }
}
