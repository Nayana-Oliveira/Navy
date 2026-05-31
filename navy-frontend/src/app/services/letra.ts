import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Letra {
  id?: number;
  musica: string;
  artista?: string;
  album?: string;
  trecho: string;
  letra: string;
  cor?: string;
}

@Injectable({
  providedIn: 'root',
})
export class LetraService {
  private api = 'https://navy-7z14.onrender.com/letras';

  constructor(private http: HttpClient) {}

  private headersAuth() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  listar(): Observable<Letra[]> {
    return this.http.get<Letra[]>(this.api);
  }

  criar(letra: Letra) {
    return this.http.post(this.api, letra, this.headersAuth());
  }

  editar(id: number, letra: Letra) {
    return this.http.put(`${this.api}/${id}`, letra, this.headersAuth());
  }

  excluir(id: number) {
    return this.http.delete(`${this.api}/${id}`, this.headersAuth());
  }
}
