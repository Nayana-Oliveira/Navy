import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Review {
  id?: number;
  titulo: string;
  tipo: string;
  nota: number;
  texto: string;
  imagem?: string;
  link?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private api = 'http://localhost:5010/reviews';

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
    return this.http.get<Review[]>(this.api);
  }

  criar(formData: FormData) {
    return this.http.post(this.api, formData, this.headersAuth());
  }

  editar(id: number, formData: FormData) {
    return this.http.put(`${this.api}/${id}`, formData, this.headersAuth());
  }

  excluir(id: number) {
    return this.http.delete(`${this.api}/${id}`, this.headersAuth());
  }
}
