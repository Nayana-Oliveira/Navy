import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Review, ReviewService } from '../../services/review';

@Component({
  selector: 'app-reviews',
  imports: [Header, CommonModule, FormsModule, Footer],
  templateUrl: './reviews.html',
  styleUrl: './reviews.css',
})
export class Reviews implements OnInit {
  reviews: Review[] = [];
  reviewsFiltradas: Review[] = [];

  reviewSelecionada?: Review;

  carregando = true;
  busca = '';
  tipoSelecionado = 'Todos';

  tipos = ['Todos', 'Anime', 'Série', 'Filme', 'Música', 'Podcast', 'Livro', 'Jogo'];

  constructor(private reviewService: ReviewService) {}

  ngOnInit() {
    this.carregarReviews();
  }

  carregarReviews() {
    this.reviewService.listar().subscribe({
      next: (resposta) => {
        this.reviews = resposta;
        this.reviewsFiltradas = resposta;
        this.carregando = false;
      },
      error: (erro) => {
        console.log(erro);
        this.carregando = false;
      },
    });
  }

  abrirModal(review: Review) {
    this.reviewSelecionada = review;
  }

  fecharModal() {
    this.reviewSelecionada = undefined;
  }

  resumo(texto: string) {
    if (texto.length <= 120) {
      return texto;
    }

    return texto.substring(0, 120) + '...';
  }

  filtrarTipo(tipo: string) {
    this.tipoSelecionado = tipo;
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    let resultado = this.reviews;

    if (this.tipoSelecionado !== 'Todos') {
      resultado = resultado.filter(
        (r) => r.tipo?.toLowerCase() === this.tipoSelecionado.toLowerCase(),
      );
    }

    if (this.busca.trim() !== '') {
      const termo = this.busca.toLowerCase();

      resultado = resultado.filter(
        (r) =>
          r.titulo.toLowerCase().includes(termo) ||
          r.texto.toLowerCase().includes(termo) ||
          r.tipo.toLowerCase().includes(termo),
      );
    }

    this.reviewsFiltradas = resultado;
  }

  urlImagem(imagem: string | undefined) {
    if (!imagem) return '';

    if (imagem.startsWith('http')) return imagem;

    if (imagem.startsWith('/')) {
      return 'https://navy-blogg.netlify.app/' + imagem;
    }

    return 'https://navy-blogg.netlify.app/' + imagem;
  }
}
