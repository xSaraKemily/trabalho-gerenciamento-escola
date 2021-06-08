import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Escola } from '../models/escola.interface';

@Injectable({
  providedIn: 'root'
})
export class EscolaService {

  // private URL = 'http://localhost:8079/api/resources/escola';

  private URL = 'http://localhost:3000/escola';

  constructor(private httpClient : HttpClient) { }

  getEscolas() {
    return this.httpClient.get<Escola[]>(this.URL);
  }

  getEscola(id: number) {
    return this.httpClient.get<Escola>(`${this.URL}/${id}`);
  }

  salvar(escola: Escola) {
    if (escola && escola.id) {
      return this.atualizar(escola);
    } else {
      return this.adicionar(escola);
    }
  }

  adicionar(escola: Escola) {
    return this.httpClient.post<Escola>(this.URL, escola);
  }

  atualizar(escola: Escola) {
    return this.httpClient.put<Escola>(`${this.URL}/${escola.id}`, escola);
  }

  excluir(escola: Escola) {
    return this.httpClient.delete(`${this.URL}/${escola.id}`);
  }
}
