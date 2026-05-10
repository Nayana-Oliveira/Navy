import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Post {
  id?: number;
  titulo: string;
  conteudo: string;
  imagem?: string;
  link_video?: string;
  link_musica?: string;
  link_podcast?: string;
  categoria?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private api = 'https://navy-blogg.netlify.app/posts';

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
    return this.http.get<Post[]>(this.api);
  }

  buscarPorId(id: string) {
    return this.http.get<Post>(`${this.api}/${id}`);
  }

  criar(formData: FormData) {
    return this.http.post(this.api, formData, this.headersAuth());
  }

  excluir(id: number) {
    return this.http.delete(`${this.api}/${id}`, this.headersAuth());
  }

  editar(id: number, formData: FormData) {
    return this.http.put(`${this.api}/${id}`, formData, this.headersAuth());
  }
}
