import { Component, OnInit } from '@angular/core';
import { EscolaService } from 'src/app/services/escola.service';
import { Escola } from 'src/app/models/escola.interface';
import { NavController } from '@ionic/angular';
import { Curso } from 'src/app/models/curso.interface';
import { CursoService } from 'src/app/services/curso.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  curso: Curso;
  escola: Escola[];

  constructor(
    private escolaService: EscolaService,
    private cursoService: CursoService,
    private navController: NavController,
    private activatedRoute: ActivatedRoute
  ) {
    this.curso = {
      nome: '',
      escola: null,
      cargaHoraria: 0,
      qtdAlunos: 0,
      descricao: '',
    };
  }

  ngOnInit() {
    this.listarEscolas();
  }

  async listarEscolas() {

    this.escolaService.getEscolas().subscribe((escolas) => {
      this.escola = escolas;
      this.carregarCurso();
    });
  }

  carregarCurso() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.cursoService.getCurso(id).subscribe(curso => this.curso = curso);
    }
  }

  compareWith(escola1: Escola, escola2: Escola) {
    return escola1 && escola2 ? escola1.id === escola2.id : escola1 === escola2;
  };

  async salvar(curso: Curso) {

    this.cursoService
      .salvar(curso)
      .subscribe(() => {
        this.navController.navigateForward(['/cursos']);
      });
  }

}
