import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Post, PostService } from '../../services/post';
import { Review, ReviewService } from '../../services/review';
import { Postit, PostitService } from '../../services/postit';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, Header, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  posts: Post[] = [];
  reviews: Review[] = [];
  postits: Postit[] = [];

  constructor(
    private postService: PostService,
    private reviewService: ReviewService,
    private postitService: PostitService,
  ) {}

  ngOnInit() {
    this.carregarTudo();
  }

  carregarTudo() {
    this.carregarPosts();
    this.carregarReviews();
    this.carregarPostits();
  }

  carregarPosts() {
    this.postService.listar().subscribe({
      next: (res) => {
        this.posts = res.slice(0, 3);
      },
      error: (err) => console.log(err),
    });
  }

  carregarReviews() {
    this.reviewService.listar().subscribe({
      next: (res) => {
        this.reviews = res.slice(0, 2);
      },
      error: (err) => console.log(err),
    });
  }

  carregarPostits() {
    this.postitService.listar().subscribe({
      next: (res) => {
        this.postits = res.slice(0, 4);
      },
      error: (err) => console.log(err),
    });
  }

  resumo(texto: string | undefined, limite = 180) {
    if (!texto) return '';

    const limpo = texto
      .replace(/[#>*_`-]/g, '')
      .replace(/\n/g, ' ')
      .trim();

    if (limpo.length <= limite) {
      return limpo;
    }

    return limpo.substring(0, limite) + '...';
  }

  urlImagem(imagem: string | undefined) {
    if (!imagem) return '';

    if (imagem.startsWith('http')) return imagem;

    if (imagem.startsWith('/')) {
      return 'https://navy-7z14.onrender.com' + imagem;
    }

    return 'https://navy-7z14.onrender.com/' + imagem;
  }
}
