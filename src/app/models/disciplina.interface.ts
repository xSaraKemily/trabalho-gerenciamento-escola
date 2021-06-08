import { Curso } from './curso.interface';

export interface Disciplina {
    id?: number;
    nome: string;
    cargaHoraria: number;
    cursos: Curso;
}
