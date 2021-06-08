import { Component, OnInit } from '@angular/core';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { Disciplina } from 'src/app/models/disciplina.interface';
import { NavController } from '@ionic/angular';
import { Aluno } from 'src/app/models/aluno.interface';
import { AlunoService } from 'src/app/services/aluno.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  aluno: Aluno;
  disciplina: Disciplina[];

  constructor(
    private disciplinaService: DisciplinaService,
    private AlunoService: AlunoService,
    private navController: NavController,
    private activatedRoute: ActivatedRoute
  ) {
    this.aluno = {
      nome: '',
      cpf: '',
      disciplinas: null,
      aprovado: true
    };
  }

  ngOnInit() {
    this.listarAlunos();
  }

  async listarAlunos() {

    this.disciplinaService.getDisciplinas().subscribe((disciplina) => {
      this.disciplina = disciplina;
      this.carregarAluno();
    });
  }

  carregarAluno() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.AlunoService.getAluno(id).subscribe(aluno => this.aluno = aluno);
    }
  }

  compareWithDisciplina(disciplina1: Disciplina, disciplina2: Disciplina) {
    return disciplina1 && disciplina2 ? disciplina1.id === disciplina2.id : disciplina1 === disciplina2;
  };

  async salvar(aluno: Aluno) {

    this.AlunoService
      .salvar(aluno)
      .subscribe(() => {
        this.navController.navigateForward(['/aluno']);
      });
  }

}
