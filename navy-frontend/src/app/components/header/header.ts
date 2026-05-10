import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})

export class Header implements OnInit {
  darkMode = false;

  ngOnInit() {
    const tema = localStorage.getItem('tema');

    if (tema === 'dark') {
      this.darkMode = true;
      document.body.classList.add('dark');
    }
  }

  alternarTema() {
    this.darkMode = !this.darkMode;

    if (this.darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('tema', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('tema', 'light');
    }
  }
}
