import * as repository from "../repository/postitRepository.js";

export async function inserirPostit(postit) {
  if (!postit.texto) {
    throw new Error("O texto do post-it é obrigatório.");
  }

  if (!postit.cor) {
    postit.cor = "#FFD966";
  }

  let id = await repository.inserirPostit(postit);

  return id;
}

export async function listarPostits() {
  let registros = await repository.listarPostits();

  return registros;
}

export async function buscarPorId(id) {
  let registro = await repository.buscarPorId(id);

  if (!registro) {
    throw new Error("Post-it não encontrado.");
  }

  return registro;
}

export async function alterarPostit(id, postit) {
  let linhasAfetadas = await repository.alterarPostit(id, postit);

  if (linhasAfetadas == 0) {
    throw new Error("Post-it não encontrado.");
  }
}

export async function deletarPostit(id) {
  let linhasAfetadas = await repository.deletarPostit(id);

  if (linhasAfetadas == 0) {
    throw new Error("Post-it não encontrado.");
  }
}
