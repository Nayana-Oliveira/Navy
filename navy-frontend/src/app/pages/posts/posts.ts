import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Header } from '../../components/header/header';
import { Post, PostService } from '../../services/post';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-posts',
  imports: [Header, RouterLink, CommonModule, FormsModule, Footer],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts implements OnInit {
  posts: Post[] = [];
  postsFiltrados: Post[] = [];

  carregando = true;
  busca = '';
  categoriaSelecionada = 'Todos';

  categorias = ['Todos', 'Pensamentos', 'Música', 'Memórias', 'Faculdade', 'Jogos', 'Poemas', 'Aleatórios'];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.carregarPosts();
  }

  carregarPosts() {
    this.postService.listar().subscribe({
      next: (resposta) => {
        this.posts = resposta;
        this.postsFiltrados = resposta;
        this.carregando = false;
      },
      error: (erro) => {
        console.log(erro);
        this.carregando = false;
      },
    });
  }

  filtrarCategoria(categoria: string) {
    this.categoriaSelecionada = categoria;
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    let resultado = this.posts;

    if (this.categoriaSelecionada !== 'Todos') {
      resultado = resultado.filter(
        (p) => p.categoria?.toLowerCase() === this.categoriaSelecionada.toLowerCase(),
      );
    }

    if (this.busca.trim() !== '') {
      const termo = this.busca.toLowerCase();

      resultado = resultado.filter(
        (p) =>
          p.titulo.toLowerCase().includes(termo) ||
          p.conteudo.toLowerCase().includes(termo) ||
          p.categoria?.toLowerCase().includes(termo),
      );
    }

    this.postsFiltrados = resultado;
  }

  urlImagem(imagem: string | undefined) {
    if (!imagem) return '';

    if (imagem.startsWith('http')) return imagem;

    if (imagem.startsWith('/')) {
      return 'https://navy-7z14.onrender.com' + imagem;
    }

    return 'https://navy-7z14.onrender.com' + imagem;
  }
}
