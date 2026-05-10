import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../components/header/header';
import { Postit, PostitService } from '../../services/postit';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-postits',
  imports: [Header, CommonModule, Footer],
  templateUrl: './postits.html',
  styleUrl: './postits.css',
})
export class Postits implements OnInit {
  postits: Postit[] = [];
  carregando = true;

  constructor(private postitService: PostitService) {}

  ngOnInit() {
    this.carregarPostits();
  }

  carregarPostits() {
    this.postitService.listar().subscribe({
      next: (resposta) => {
        this.postits = resposta;
        this.carregando = false;
      },
      error: (erro) => {
        console.log(erro);
        this.carregando = false;
      },
    });
  }
}
