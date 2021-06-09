import { Component, OnInit } from '@angular/core';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { Disciplina } from 'src/app/models/disciplina.interface';
import { NavController, ToastController } from '@ionic/angular';
import { Professor } from 'src/app/models/professor.interface';
import { ProfessorService } from 'src/app/services/professor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  professor: Professor;
  disciplina: Disciplina[];

  constructor(
    private disciplinaService: DisciplinaService,
    private professorService: ProfessorService,
    private navController: NavController,
    private activatedRoute: ActivatedRoute,
    private toast: ToastController
  ) {
    this.professor = {
      nome: '',
      idade: 0,
      cpf: '',
      disciplinas: null,
      imagem: ''
    };
  }

  ngOnInit() {
    this.listarDisciplinas();
  }

  async listarDisciplinas() {

    this.disciplinaService.getDisciplinas().subscribe((disciplinas) => {
      this.disciplina = disciplinas;
      this.carregarProfessor();
    });
  }

  carregarProfessor() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.professorService.getProfessor(id).subscribe(professor => this.professor = professor);
    }
  }

  compareWith(disciplina1: Disciplina, disciplina2: Disciplina) {
    return disciplina1 && disciplina2 ? disciplina1.id === disciplina2.id : disciplina1 === disciplina2;
  };

  async salvar(professor: Professor) {

    this.professorService
      .salvar(professor)
      .subscribe(() => {
        this.navController.navigateForward(['/professores']);
      },
      (response) => {
        this.toast.create({
          message: 'Não foi possível salvar o professor.',
          color: 'danger',
          duration: 3000,
          keyboardClose: true
        }).then(t => t.present());
      });
  }

}
