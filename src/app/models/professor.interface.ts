import { Disciplina } from './disciplina.interface';

export interface Professor {
    id?: number;
    nome: string;
    idade: number;
    disciplinas: Disciplina;
    imagem: string;
}
