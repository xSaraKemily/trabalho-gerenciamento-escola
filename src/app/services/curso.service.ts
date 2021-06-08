import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from '../models/curso.interface';

@Injectable({providedIn: 'root'}) //indica que a class é uma table

export class CursoService {

  // private URL = 'http://localhost:8079/book-api/resources/cursos';

  private URL = 'http://localhost:3000/cursos';

  constructor(
    private httpClient:HttpClient
  ) { }

  getCursos() {
    return this.httpClient.get<Curso[]>(this.URL);
  }

  getCurso(id: number) {
    return this.httpClient.get<Curso>(`${this.URL}/${id}`);
  }

  salvar(curso: Curso) {
    if(curso.id) {
      return this.atualizar(curso);
    } else {
      return this.adicionar(curso);
    }
  }

  excluir(curso: Curso) {
    return this.httpClient.delete(`${this.URL}/${curso.id}`);
  }

  private adicionar(curso: Curso) {
    return this.httpClient.post(this.URL, curso);
  }

  private atualizar(curso: Curso) {
    return this.httpClient.put(`${this.URL}/${curso.id}`, curso);
  }
}
