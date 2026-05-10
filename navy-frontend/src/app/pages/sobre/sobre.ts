import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-sobre',
  imports: [Header, Footer],
  templateUrl: './sobre.html',
  styleUrl: './sobre.css'
})
export class Sobre {

}