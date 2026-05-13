import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Musica {
  id?: number;
  titulo: string;
  artista?: string;
  descricao?: string;
  link: string;
  mood?: string;
  criado_em?: string;
}

@Injectable({
  providedIn: 'root',
})
export class MusicaService {
  private api = 'https://navy-7z14.onrender.com/musicas';

  constructor(private http: HttpClient) {}

  private headersAuth() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  listar() {
    return this.http.get<Musica[]>(this.api);
  }

  criar(musica: Musica) {
    return this.http.post(this.api, musica, this.headersAuth());
  }

  editar(id: number, musica: Musica) {
    return this.http.put(`${this.api}/${id}`, musica, this.headersAuth());
  }

  excluir(id: number) {
    return this.http.delete(`${this.api}/${id}`, this.headersAuth());
  }
}
