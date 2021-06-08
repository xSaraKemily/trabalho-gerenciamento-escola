import { Component, OnInit } from '@angular/core';
import { DisciplinaService } from '../services/disciplina.service';
import { Disciplina } from '../models/disciplina.interface';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-disciplinas',
  templateUrl: './disciplinas.page.html',
  styleUrls: ['./disciplinas.page.scss'],
})
export class DisciplinasPage implements OnInit {

  disciplinas: Disciplina[];

  constructor(
    private disciplinaService: DisciplinaService,
    private alertController: AlertController
  ) { }

  ngOnInit() { }

  setFiltered(ev: any){
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      return this.disciplinas = this.disciplinas.filter((d) => {
        if (d.nome.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return true;
        }
   
         return false;
      });
    } else {
      this.listar();
    }
  }


  ionViewWillEnter() {
    this.listar();
  }

  async listar() {

    this.disciplinas = await this.disciplinaService.getDisciplinas().toPromise();
  }

  async confirmacaoExclusao(disciplina: Disciplina) {
    const alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir a disciplina ${disciplina.nome}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => this.excluir(disciplina)
        },
        {
          text: 'Não'
        }
      ]
    });
    alerta.present();
  }

  private async excluir(disciplina: Disciplina) {

    this.disciplinaService.excluir(disciplina).subscribe(() => {
      this.listar()
    });
  }

}
