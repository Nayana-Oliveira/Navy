import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Header } from '../../components/header/header';
import { Post, PostService } from '../../services/post';
import { Review, ReviewService } from '../../services/review';
import { Postit, PostitService } from '../../services/postit';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-home',
  imports: [Header, RouterLink, CommonModule, Footer],
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

  urlImagem(imagem: string | undefined) {
    if (!imagem) {
      return '';
    }

    if (imagem.startsWith('http')) {
      return imagem;
    }

    if (imagem.startsWith('/')) {
      return 'https://navy-blogg.netlify.app/' + imagem;
    }

    return 'https://navy-blogg.netlify.app/' + imagem;
  }
}
