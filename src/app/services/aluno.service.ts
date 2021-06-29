import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Aluno } from '../models/aluno.interface';

@Injectable({providedIn: 'root'})

export class AlunoService {

  private URL = 'http://localhost:8080/gerenciamentoEscola-1.0.0/api/alunos';

  // private URL = 'http://localhost:3000/aluno';

  constructor(
    private httpClient:HttpClient
  ) { }

  getAlunos(value: string = 'tudo') {
    // let params = new HttpParams().set('query', value);

    return this.httpClient.get<Aluno[]>(this.URL);

    // return this.httpClient.get<Aluno[]>(this.URL, {
    //   params: params,
    //   headers: new HttpHeaders({'Content-Type': 'application/json'})
    // });
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
