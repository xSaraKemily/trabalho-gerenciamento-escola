import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aluno } from '../models/aluno.interface';

@Injectable({providedIn: 'root'})

export class AlunoService {

  // private URL = 'http://localhost:8079/api/resources/alunos';

  private URL = 'http://localhost:3000/aluno';

  constructor(
    private httpClient:HttpClient
  ) { }

  getAlunos() {
    return this.httpClient.get<Aluno[]>(this.URL);
  }

  excluir(aluno: Aluno) {
    return this.httpClient.delete(`${this.URL}/${aluno.id}`);
  }

  private adicionar(aluno: Aluno) {
    return this.httpClient.post(this.URL, aluno);
  }

  private atualizar(aluno: Aluno) {
    return this.httpClient.put(`${this.URL}/${aluno.id}`, aluno);
  }

  salvar(aluno: Aluno) {
    if(aluno.id) {
      return this.atualizar(aluno);
    } else {
      return this.adicionar(aluno);
    }
  }

  getAluno(id: number) {
    return this.httpClient.get<Aluno>(`${this.URL}/${id}`);
  }

}
