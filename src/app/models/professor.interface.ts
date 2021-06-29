import { Disciplina } from './disciplina.interface';

export interface Professor {
    id?: number;
    nome: string;
    endereco: string;
    disciplinas: Disciplina;
    imagem: string;
    cpf: string;
}
