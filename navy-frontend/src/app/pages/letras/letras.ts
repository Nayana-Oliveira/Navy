import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';

import { Letra, LetraService } from '../../services/letra';

@Component({
  selector: 'app-letras',
  imports: [CommonModule, Header, Footer],
  templateUrl: './letras.html',
  styleUrl: './letras.css',
})
export class Letras implements OnInit {
  letras: Letra[] = [];

  modal = false;

  selecionada?: Letra;

  constructor(private service: LetraService) {}

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.service.listar().subscribe((r) => {
      this.letras = r;
    });
  }

  abrir(l: Letra) {
    this.selecionada = l;
    this.modal = true;
  }

  fechar() {
    this.modal = false;
  }
}
