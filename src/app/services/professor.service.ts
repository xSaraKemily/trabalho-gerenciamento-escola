import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Professor } from '../models/professor.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  private URL = 'http://localhost:8080/gerenciamentoEscola-1.0.0/api/professores';

  // private URL = 'http://localhost:3000/professores';

  constructor(private httpClient:HttpClient) { }

  getProfessores() {
    return this.httpClient.get<Professor[]>(this.URL);
  }

  excluir(professor: Professor) {
    return this.httpClient.delete(`${this.URL}/${professor.id}`);
  }

  private adicionar(professor: Professor) {
    return this.httpClient.post(this.URL, professor);
  }

  private atualizar(professor: Professor) {
    return this.httpClient.put(`${this.URL}/${professor.id}`, professor);
  }

  salvar(professor: Professor) {
    if(professor.id) {
      return this.atualizar(professor);
    } else {
      return this.adicionar(professor);
    }
  }

  getProfessor(id: number) {
    return this.httpClient.get<Professor>(`${this.URL}/${id}`);
  }

}
