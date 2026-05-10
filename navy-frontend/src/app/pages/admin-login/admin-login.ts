import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AdminService } from '../../services/admin';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLogin {
  email = '';
  senha = '';
  erro = '';

  constructor(
    private adminService: AdminService,
    private router: Router,
  ) {}

  entrar() {
    this.erro = '';

    this.adminService.login(this.email, this.senha).subscribe({
      next: (resposta) => {
        this.adminService.salvarToken(resposta.token);
        this.router.navigate(['/admin/dashboard']);
      },
      error: (erro) => {
        this.erro = erro.error?.erro || 'Erro ao fazer login.';
      },
    });
  }
}
