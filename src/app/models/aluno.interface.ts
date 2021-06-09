import { Escola } from 'src/app/models/escola.interface';
import { Disciplina } from './disciplina.interface';

export interface Aluno {
    id?: number;
    nome: string;
    cpf: string;
    aprovado: boolean;
    disciplinas: Disciplina;
    imagem: string;
}
