import { Component, OnInit } from '@angular/core';
import { CursoService } from 'src/app/services/curso.service';
import { Curso } from 'src/app/models/curso.interface';
import { NavController, ToastController } from '@ionic/angular';
import { Disciplina } from 'src/app/models/disciplina.interface';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  disciplina: Disciplina;
  cursos: Curso[];

  constructor(
    private cursoService: CursoService,
    private disciplinaService: DisciplinaService,
    private navController: NavController,
    private activatedRoute: ActivatedRoute,
    private toast: ToastController
  ) {
    this.disciplina = {
      nome: '',
      cursos: null,
      cargaHoraria: 0
    };
  }

  ngOnInit() {
    this.listarCursos();
  }

  async listarCursos() {

    this.cursoService.getCursos().subscribe((cursos) => {
      this.cursos = cursos;
      this.carregarDisciplina();
    });
  }

  carregarDisciplina() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.disciplinaService.getDisciplina(id).subscribe(disciplina => this.disciplina = disciplina);
    }
  }

  compareWith(curso1: Curso, curso2: Curso) {
    return curso1 && curso2 ? curso1.id === curso2.id : curso1 === curso2;
  };

  async salvar(disciplina: Disciplina) {

    this.disciplinaService
      .salvar(disciplina)
      .subscribe(() => {
        this.navController.navigateForward(['/disciplinas']);
      },
      (response) => {
        this.toast.create({
          message: response.error ? response.error : 'Não foi possível salvar a disciplina.',
          color: 'danger',
          duration: 3000,
          keyboardClose: true
        }).then(t => t.present());
      });
  }

}
