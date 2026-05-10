import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private api = 'https://navy-blogg.netlify.app/admin';

  constructor(private http: HttpClient) {}

  login(email: string, senha: string) {
    return this.http.post<LoginResponse>(`${this.api}/login`, {
      email,
      senha,
    });
  }

  salvarToken(token: string) {
    localStorage.setItem('token', token);
  }

  pegarToken() {
    return localStorage.getItem('token');
  }

  sair() {
    localStorage.removeItem('token');
  }

  estaLogado() {
    return !!this.pegarToken();
  }
}
