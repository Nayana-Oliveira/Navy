import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Header } from '../../components/header/header';
import { Post, PostService } from '../../services/post';
import { Footer } from '../../components/footer/footer';
import { Title, Meta } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-post-detalhe',
  imports: [Header, CommonModule, Footer, MarkdownModule],
  templateUrl: './post-detalhe.html',
  styleUrl: './post-detalhe.css',
})
export class PostDetalhe implements OnInit {
  post?: Post;
  carregando = true;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private sanitizer: DomSanitizer,
    private titleService: Title,
    private metaService: Meta,
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.buscarPost(id);
    }
  }

  buscarPost(id: string) {
    this.postService.buscarPorId(id).subscribe({
      next: (resposta) => {
        this.post = resposta;

        this.titleService.setTitle(`${resposta.titulo} — Navy`);

        this.metaService.updateTag({
          name: 'description',
          content: resposta.conteudo.substring(0, 140),
        });

        this.metaService.updateTag({
          property: 'og:title',
          content: resposta.titulo,
        });

        this.metaService.updateTag({
          property: 'og:description',
          content: resposta.conteudo.substring(0, 140),
        });

        if (resposta.imagem) {
          this.metaService.updateTag({
            property: 'og:image',
            content: this.urlImagem(resposta.imagem),
          });
        }

        this.carregando = false;
      },
      error: (erro) => {
        console.log(erro);
        this.carregando = false;
      },
    });
  }

  urlImagem(imagem: string | undefined) {
    if (!imagem) return '';

    if (imagem.startsWith('http')) return imagem;

    if (imagem.startsWith('/')) {
      return 'https://navy-7z14.onrender.com' + imagem;
    }

    return 'https://navy-7z14.onrender.com' + imagem;
  }

  gerarEmbedYoutube(link: string | undefined): SafeResourceUrl | null {
    if (!link) return null;

    let videoId = '';

    if (link.includes('watch?v=')) {
      videoId = link.split('watch?v=')[1].split('&')[0];
    } else if (link.includes('youtu.be/')) {
      videoId = link.split('youtu.be/')[1].split('?')[0];
    } else if (link.includes('/shorts/')) {
      videoId = link.split('/shorts/')[1].split('?')[0];
    }

    if (!videoId) return null;

    const embed = `https://www.youtube.com/embed/${videoId}`;

    return this.sanitizer.bypassSecurityTrustResourceUrl(embed);
  }

  gerarEmbedSpotify(link: string | undefined): SafeResourceUrl | null {
    if (!link) {
      return null;
    }

    if (link.includes('spotify.link')) {
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
    } else if (link.includes('/episode/')) {
      tipo = 'episode';
      id = link.split('/episode/')[1].split('?')[0];
    } else if (link.includes('/show/')) {
      tipo = 'show';
      id = link.split('/show/')[1].split('?')[0];
    }

    if (!tipo || !id) {
      return null;
    }

    const embed = `https://open.spotify.com/embed/${tipo}/${id}`;

    return this.sanitizer.bypassSecurityTrustResourceUrl(embed);
  }

  mensagemCompartilhar = '';

  copiarLink() {
    const link = window.location.href;

    navigator.clipboard.writeText(link).then(() => {
      this.mensagemCompartilhar = 'Link copiado!';

      setTimeout(() => {
        this.mensagemCompartilhar = '';
      }, 2500);
    });
  }

  compartilharWhatsApp() {
    const texto = encodeURIComponent(`${this.post?.titulo} - ${window.location.href}`);

    window.open(`https://wa.me/?text=${texto}`, '_blank');
  }

  compartilharTelegram() {
    const texto = encodeURIComponent(this.post?.titulo || '');
    const url = encodeURIComponent(window.location.href);

    window.open(`https://t.me/share/url?url=${url}&text=${texto}`, '_blank');
  }

  compartilharTwitter() {
    const texto = encodeURIComponent(this.post?.titulo || '');
    const url = encodeURIComponent(window.location.href);

    window.open(`https://twitter.com/intent/tweet?text=${texto}&url=${url}`, '_blank');
  }
}
