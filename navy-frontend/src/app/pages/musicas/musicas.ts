import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Musica, MusicaService } from '../../services/musica';

@Component({
  selector: 'app-musicas',
  imports: [CommonModule, FormsModule, Header, Footer],
  templateUrl: './musicas.html',
  styleUrl: './musicas.css',
})
export class Musicas implements OnInit {
  musicas: Musica[] = [];
  musicasFiltradas: Musica[] = [];

  carregando = true;
  busca = '';

  constructor(
    private musicaService: MusicaService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.carregarMusicas();
  }

  carregarMusicas() {
    this.musicaService.listar().subscribe({
      next: (res) => {
        this.musicas = res;
        this.musicasFiltradas = res;
        this.carregando = false;
      },
      error: (err) => {
        console.log(err);
        this.carregando = false;
      },
    });
  }

  aplicarBusca() {
    const termo = this.busca.toLowerCase().trim();

    if (!termo) {
      this.musicasFiltradas = this.musicas;
      return;
    }

    this.musicasFiltradas = this.musicas.filter(
      (m) =>
        m.titulo.toLowerCase().includes(termo) ||
        m.artista?.toLowerCase().includes(termo) ||
        m.descricao?.toLowerCase().includes(termo) ||
        m.mood?.toLowerCase().includes(termo),
    );
  }

  gerarEmbedSpotify(link: string): SafeResourceUrl | null {
    if (!link || !link.includes('spotify.com')) {
      return null;
    }

    let tipo = '';
    let id = '';

    if (link.includes('/track/')) {
      tipo = 'track';
      id = link.split('/track/')[1].split('?')[0];
    } else if (link.includes('/album/')) {
      tipo = 'album';
      id = link.split('/album/')[1].split('?')[0];
    } else if (link.includes('/playlist/')) {
      tipo = 'playlist';
      id = link.split('/playlist/')[1].split('?')[0];
    }

    if (!tipo || !id) {
      return null;
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://open.spotify.com/embed/${tipo}/${id}`,
    );
  }

  gerarEmbedSoundCloud(link: string): SafeResourceUrl | null {
    if (!link || !link.includes('soundcloud.com')) {
      return null;
    }

    const url = encodeURIComponent(link);

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://w.soundcloud.com/player/?url=${url}&color=%23a64b2a&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`,
    );
  }
}
