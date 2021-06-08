import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Disciplina } from '../models/disciplina.interface';

@Injectable({providedIn: 'root'}) //-> a class é uma tabela

export class DisciplinaService {

  // private URL = 'http://localhost:8079/api/resources/disciplinas';
  private URL = 'http://localhost:3000/disciplinas';

  constructor(private httpClient:HttpClient) { }

  getDisciplinas() {
    return this.httpClient.get<Disciplina[]>(this.URL);
  }

  excluir(disciplina: Disciplina) {
    return this.httpClient.delete(`${this.URL}/${disciplina.id}`);
  }

  private adicionar(disciplina: Disciplina) {
    return this.httpClient.post(this.URL, disciplina);
  }

  private atualizar(disciplina: Disciplina) {
    return this.httpClient.put(`${this.URL}/${disciplina.id}`, disciplina);
  }

  salvar(disciplina: Disciplina) {
    if(disciplina.id) {
      return this.atualizar(disciplina);
    } else {
      return this.adicionar(disciplina);
    }
  }

  getDisciplina(id: number) {
    return this.httpClient.get<Disciplina>(`${this.URL}/${id}`);
  }

}
