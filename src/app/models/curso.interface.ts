import { Escola } from './escola.interface';

export interface Curso {
    id?: number;
    nome: string;
    cargaHoraria: number;
    escola: Escola;
}
