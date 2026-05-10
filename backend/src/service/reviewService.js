import * as repository from "../repository/reviewRepository.js";

export async function inserirReview(review) {
  if (!review.titulo) {
    throw new Error("O título é obrigatório.");
  }

  if (!review.tipo) {
    throw new Error("O tipo da review é obrigatório.");
  }

  if (!review.nota) {
    throw new Error("A nota é obrigatória.");
  }

  if (review.nota < 0 || review.nota > 10) {
    throw new Error("A nota precisa estar entre 0 e 10.");
  }

  if (!review.texto) {
    throw new Error("O texto da review é obrigatório.");
  }

  let id = await repository.inserirReview(review);

  return id;
}

export async function listarReviews() {
  let registros = await repository.listarReviews();

  return registros;
}

export async function buscarPorId(id) {
  let registro = await repository.buscarPorId(id);

  if (!registro) {
    throw new Error("Review não encontrada.");
  }

  return registro;
}

export async function alterarReview(id, review) {
  if (!review.titulo) {
    throw new Error("O título é obrigatório.");
  }

  if (!review.tipo) {
    throw new Error("O tipo da review é obrigatório.");
  }

  if (!review.nota) {
    throw new Error("A nota é obrigatória.");
  }

  if (review.nota < 0 || review.nota > 10) {
    throw new Error("A nota precisa estar entre 0 e 10.");
  }

  if (!review.texto) {
    throw new Error("O texto da review é obrigatório.");
  }

  let linhasAfetadas = await repository.alterarReview(id, review);

  if (linhasAfetadas == 0) {
    throw new Error("Review não encontrada.");
  }
}

export async function deletarReview(id) {
  let linhasAfetadas = await repository.deletarReview(id);

  if (linhasAfetadas == 0) {
    throw new Error("Review não encontrada.");
  }
}
