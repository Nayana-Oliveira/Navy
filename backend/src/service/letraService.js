import * as repository from "../repository/letraRepository.js";

export async function inserirLetra(letra) {
  if (!letra.musica) {
    throw new Error("Nome da música obrigatório.");
  }

  if (!letra.trecho) {
    throw new Error("Trecho obrigatório.");
  }

  return await repository.inserirLetra(letra);
}

export async function listarLetras() {
  return await repository.listarLetras();
}

export async function buscarPorId(id) {
  let registro = await repository.buscarPorId(id);

  if (!registro) {
    throw new Error("Letra não encontrada.");
  }

  return registro;
}

export async function alterarLetra(id, letra) {
  let linhas = await repository.alterarLetra(id, letra);

  if (linhas === 0) {
    throw new Error("Letra não encontrada.");
  }
}

export async function deletarLetra(id) {
  let linhas = await repository.deletarLetra(id);

  if (linhas === 0) {
    throw new Error("Letra não encontrada.");
  }
}
