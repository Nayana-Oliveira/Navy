import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Postit {
  id?: number;
  texto: string;
  cor: string;
  criado_em?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostitService {
  private api = 'https://navy-blogg.netlify.app/postits';

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
    return this.http.get<Postit[]>(this.api);
  }

  criar(postit: Postit) {
    return this.http.post(this.api, postit, this.headersAuth());
  }

  editar(id: number, postit: Postit) {
    return this.http.put(`${this.api}/${id}`, postit, this.headersAuth());
  }

  excluir(id: number) {
    return this.http.delete(`${this.api}/${id}`, this.headersAuth());
  }
}
