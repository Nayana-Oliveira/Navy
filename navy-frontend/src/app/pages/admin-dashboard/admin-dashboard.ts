import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AdminService } from '../../services/admin';

import { Post, PostService } from '../../services/post';
import { Review, ReviewService } from '../../services/review';
import { Postit, PostitService } from '../../services/postit';
import { Musica, MusicaService } from '../../services/musica';
import { Letra, LetraService } from '../../services/letra';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
  aba = 'posts';

  posts: Post[] = [];
  reviews: Review[] = [];
  postits: Postit[] = [];
  musicas: Musica[] = [];
  letras: Letra[] = [];

  postsPorCategoria: any[] = [];
  reviewsPorTipo: any[] = [];

  mensagem = '';
  erro = '';

  postEditandoId?: number;
  titulo = '';
  categoria = '';
  conteudo = '';
  link_video = '';
  link_musica = '';
  link_podcast = '';
  imagem?: File;

  reviewEditandoId?: number;
  reviewTitulo = '';
  reviewTipo = '';
  reviewNota = 0;
  reviewTexto = '';
  reviewLink = '';
  reviewImagem?: File;

  postitEditandoId?: number;
  postitTexto = '';
  postitCor = '#f6d77a';

  musicaEditandoId?: number;
  musicaTitulo = '';
  musicaArtista = '';
  musicaDescricao = '';
  musicaLink = '';
  musicaMood = '';

  letraEditandoId?: number;
  letraMusica = '';
  letraArtista = '';
  letraAlbum = '';
  letraTrecho = '';
  letraCompleta = '';
  letraCor = '#98A08F';

  constructor(
    private adminService: AdminService,
    private router: Router,
    private postService: PostService,
    private reviewService: ReviewService,
    private postitService: PostitService,
    private musicaService: MusicaService,
    private letraService: LetraService,
  ) {}

  ngOnInit() {
    this.carregarTudo();
  }

  trocarAba(aba: string) {
    this.aba = aba;
    this.mensagem = '';
    this.erro = '';
  }

  carregarTudo() {
    this.carregarPosts();
    this.carregarReviews();
    this.carregarPostits();
    this.carregarMusicas();
    this.carregarLetras();
  }

  carregarPosts() {
    this.postService.listar().subscribe({
      next: (res) => {
        this.posts = res;
        this.gerarAnalyticsPosts();
      },
      error: (err) => console.log(err),
    });
  }

  carregarReviews() {
    this.reviewService.listar().subscribe({
      next: (res) => {
        this.reviews = res;
        this.gerarAnalyticsReviews();
      },
      error: (err) => console.log(err),
    });
  }

  carregarPostits() {
    this.postitService.listar().subscribe({
      next: (res) => {
        this.postits = res;
      },
      error: (err) => console.log(err),
    });
  }

  carregarMusicas() {
    this.musicaService.listar().subscribe({
      next: (res) => {
        this.musicas = res;
      },
      error: (err) => console.log(err),
    });
  }

  gerarAnalyticsPosts() {
    const mapa: any = {};

    for (let post of this.posts) {
      const categoria = post.categoria || 'Sem categoria';

      if (!mapa[categoria]) {
        mapa[categoria] = 0;
      }

      mapa[categoria]++;
    }

    this.postsPorCategoria = Object.keys(mapa).map((chave) => ({
      nome: chave,
      quantidade: mapa[chave],
    }));
  }

  gerarAnalyticsReviews() {
    const mapa: any = {};

    for (let review of this.reviews) {
      const tipo = review.tipo || 'Sem tipo';

      if (!mapa[tipo]) {
        mapa[tipo] = 0;
      }

      mapa[tipo]++;
    }

    this.reviewsPorTipo = Object.keys(mapa).map((chave) => ({
      nome: chave,
      quantidade: mapa[chave],
    }));
  }

  selecionarImagem(event: any) {
    this.imagem = event.target.files[0];
  }

  salvarPost() {
    this.mensagem = '';
    this.erro = '';

    const formData = new FormData();

    formData.append('titulo', this.titulo);
    formData.append('categoria', this.categoria);
    formData.append('conteudo', this.conteudo);
    formData.append('link_video', this.link_video);
    formData.append('link_musica', this.link_musica);
    formData.append('link_podcast', this.link_podcast);

    if (this.imagem) {
      formData.append('imagem', this.imagem);
    }

    if (this.postEditandoId) {
      this.postService.editar(this.postEditandoId, formData).subscribe({
        next: () => {
          this.mensagem = 'Post editado com sucesso!';
          this.cancelarEdicaoPost();
          this.carregarPosts();
        },
        error: (err) => {
          this.erro = err.error?.erro || 'Erro ao editar post.';
        },
      });
    } else {
      this.postService.criar(formData).subscribe({
        next: () => {
          this.mensagem = 'Post cadastrado com sucesso!';
          this.limparPost();
          this.carregarPosts();
        },
        error: (err) => {
          this.erro = err.error?.erro || 'Erro ao cadastrar post.';
        },
      });
    }
  }

  editarPost(post: Post) {
    this.postEditandoId = post.id;

    this.titulo = post.titulo;
    this.categoria = post.categoria || '';
    this.conteudo = post.conteudo;

    this.link_video = post.link_video || '';
    this.link_musica = post.link_musica || '';
    this.link_podcast = post.link_podcast || '';
  }

  excluirPost(id?: number) {
    if (!id) return;

    this.postService.excluir(id).subscribe({
      next: () => this.carregarPosts(),
      error: (err) => console.log(err),
    });
  }

  cancelarEdicaoPost() {
    this.postEditandoId = undefined;
    this.limparPost();
  }

  limparPost() {
    this.titulo = '';
    this.categoria = '';
    this.conteudo = '';
    this.link_video = '';
    this.link_musica = '';
    this.link_podcast = '';
    this.imagem = undefined;
  }

  selecionarImagemReview(event: any) {
    this.reviewImagem = event.target.files[0];
  }

  salvarReview() {
    this.mensagem = '';
    this.erro = '';

    const formData = new FormData();

    formData.append('titulo', this.reviewTitulo);
    formData.append('tipo', this.reviewTipo);
    formData.append('nota', String(this.reviewNota));
    formData.append('texto', this.reviewTexto);
    formData.append('link', this.reviewLink);

    if (this.reviewImagem) {
      formData.append('imagem', this.reviewImagem);
    }

    if (this.reviewEditandoId) {
      this.reviewService.editar(this.reviewEditandoId, formData).subscribe({
        next: () => {
          this.mensagem = 'Review editada com sucesso!';
          this.cancelarEdicaoReview();
          this.carregarReviews();
        },
        error: (err) => {
          this.erro = err.error?.erro || 'Erro ao editar review.';
        },
      });
    } else {
      this.reviewService.criar(formData).subscribe({
        next: () => {
          this.mensagem = 'Review cadastrada com sucesso!';
          this.limparReview();
          this.carregarReviews();
        },
        error: (err) => {
          this.erro = err.error?.erro || 'Erro ao cadastrar review.';
        },
      });
    }
  }

  editarReview(review: Review) {
    this.reviewEditandoId = review.id;

    this.reviewTitulo = review.titulo;
    this.reviewTipo = review.tipo;
    this.reviewNota = review.nota;
    this.reviewTexto = review.texto;
    this.reviewLink = review.link || '';
  }

  excluirReview(id?: number) {
    if (!id) return;

    this.reviewService.excluir(id).subscribe({
      next: () => this.carregarReviews(),
      error: (err) => console.log(err),
    });
  }

  cancelarEdicaoReview() {
    this.reviewEditandoId = undefined;
    this.limparReview();
  }

  limparReview() {
    this.reviewTitulo = '';
    this.reviewTipo = '';
    this.reviewNota = 0;
    this.reviewTexto = '';
    this.reviewLink = '';
    this.reviewImagem = undefined;
  }

  salvarPostit() {
    this.mensagem = '';
    this.erro = '';

    const postit: Postit = {
      texto: this.postitTexto,
      cor: this.postitCor,
    };

    if (this.postitEditandoId) {
      this.postitService.editar(this.postitEditandoId, postit).subscribe({
        next: () => {
          this.mensagem = 'Post-it editado com sucesso!';
          this.cancelarEdicaoPostit();
          this.carregarPostits();
        },
        error: (err) => {
          this.erro = err.error?.erro || 'Erro ao editar post-it.';
        },
      });
    } else {
      this.postitService.criar(postit).subscribe({
        next: () => {
          this.mensagem = 'Post-it cadastrado com sucesso!';
          this.limparPostit();
          this.carregarPostits();
        },
        error: (err) => {
          this.erro = err.error?.erro || 'Erro ao cadastrar post-it.';
        },
      });
    }
  }

  editarPostit(postit: Postit) {
    this.postitEditandoId = postit.id;
    this.postitTexto = postit.texto;
    this.postitCor = postit.cor;
  }

  excluirPostit(id?: number) {
    if (!id) return;

    this.postitService.excluir(id).subscribe({
      next: () => this.carregarPostits(),
      error: (err) => console.log(err),
    });
  }

  cancelarEdicaoPostit() {
    this.postitEditandoId = undefined;
    this.limparPostit();
  }

  limparPostit() {
    this.postitTexto = '';
    this.postitCor = '#f6d77a';
  }

  salvarMusica() {
    this.mensagem = '';
    this.erro = '';

    const musica: Musica = {
      titulo: this.musicaTitulo,
      artista: this.musicaArtista,
      descricao: this.musicaDescricao,
      link: this.musicaLink,
      mood: this.musicaMood,
    };

    if (this.musicaEditandoId) {
      this.musicaService.editar(this.musicaEditandoId, musica).subscribe({
        next: () => {
          this.mensagem = 'Música editada com sucesso!';
          this.cancelarEdicaoMusica();
          this.carregarMusicas();
        },
        error: (err) => {
          this.erro = err.error?.erro || 'Erro ao editar música.';
        },
      });
    } else {
      this.musicaService.criar(musica).subscribe({
        next: () => {
          this.mensagem = 'Música cadastrada com sucesso!';
          this.limparMusica();
          this.carregarMusicas();
        },
        error: (err) => {
          this.erro = err.error?.erro || 'Erro ao cadastrar música.';
        },
      });
    }
  }

  editarMusica(musica: Musica) {
    this.musicaEditandoId = musica.id;

    this.musicaTitulo = musica.titulo;
    this.musicaArtista = musica.artista || '';
    this.musicaDescricao = musica.descricao || '';
    this.musicaLink = musica.link;
    this.musicaMood = musica.mood || '';
  }

  excluirMusica(id?: number) {
    if (!id) return;

    this.musicaService.excluir(id).subscribe({
      next: () => this.carregarMusicas(),
      error: (err) => console.log(err),
    });
  }

  cancelarEdicaoMusica() {
    this.musicaEditandoId = undefined;
    this.limparMusica();
  }

  limparMusica() {
    this.musicaTitulo = '';
    this.musicaArtista = '';
    this.musicaDescricao = '';
    this.musicaLink = '';
    this.musicaMood = '';
  }

  sair() {
    this.adminService.sair();
    this.router.navigate(['/admin']);
  }

  carregarLetras() {
    this.letraService.listar().subscribe({
      next: (res) => {
        this.letras = res;
      },
      error: (err) => console.log(err),
    });
  }

  salvarLetra() {
    this.mensagem = '';
    this.erro = '';

    const letra: Letra = {
      musica: this.letraMusica,
      artista: this.letraArtista,
      album: this.letraAlbum,
      trecho: this.letraTrecho,
      letra: this.letraCompleta,
      cor: this.letraCor,
    };

    if (this.letraEditandoId) {
      this.letraService.editar(this.letraEditandoId, letra).subscribe({
        next: () => {
          this.mensagem = 'Letra editada com sucesso!';
          this.cancelarEdicaoLetra();
          this.carregarLetras();
        },
        error: (err) => {
          this.erro = err.error?.erro || 'Erro ao editar letra.';
        },
      });
    } else {
      this.letraService.criar(letra).subscribe({
        next: () => {
          this.mensagem = 'Letra cadastrada com sucesso!';
          this.limparLetra();
          this.carregarLetras();
        },
        error: (err) => {
          this.erro = err.error?.erro || 'Erro ao cadastrar letra.';
        },
      });
    }
  }

  editarLetra(letra: Letra) {
    this.letraEditandoId = letra.id;
    this.letraMusica = letra.musica;
    this.letraArtista = letra.artista || '';
    this.letraAlbum = letra.album || '';
    this.letraTrecho = letra.trecho;
    this.letraCompleta = letra.letra;
    this.letraCor = letra.cor || '#98A08F';
  }

  excluirLetra(id?: number) {
    if (!id) return;

    this.letraService.excluir(id).subscribe({
      next: () => this.carregarLetras(),
      error: (err) => console.log(err),
    });
  }

  cancelarEdicaoLetra() {
    this.letraEditandoId = undefined;
    this.limparLetra();
  }

  limparLetra() {
    this.letraMusica = '';
    this.letraArtista = '';
    this.letraAlbum = '';
    this.letraTrecho = '';
    this.letraCompleta = '';
    this.letraCor = '#98A08F';
  }
}
