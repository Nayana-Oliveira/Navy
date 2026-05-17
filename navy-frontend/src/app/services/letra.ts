import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  listar(): Observable<Letra[]> {
    return this.http.get<Letra[]>(this.api);
  }
}
