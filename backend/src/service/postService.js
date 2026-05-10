import * as repository from "../repository/postRepository.js";

export async function inserirPost(post) {
  if (!post.titulo) {
    throw new Error("O título é obrigatório.");
  }

  if (!post.conteudo) {
    throw new Error("O conteúdo é obrigatório.");
  }

  let id = await repository.inserirPost(post);

  return id;
}

export async function listarPosts() {
  let registros = await repository.listarPosts();

  return registros;
}

export async function buscarPorId(id) {
  let registro = await repository.buscarPorId(id);

  if (!registro) {
    throw new Error("Post não encontrado.");
  }

  return registro;
}

export async function alterarPost(id, post) {
  let linhasAfetadas = await repository.alterarPost(id, post);

  if (linhasAfetadas == 0) {
    throw new Error("Post não encontrado.");
  }
}

export async function deletarPost(id) {
  let linhasAfetadas = await repository.deletarPost(id);

  if (linhasAfetadas == 0) {
    throw new Error("Post não encontrado.");
  }
}
