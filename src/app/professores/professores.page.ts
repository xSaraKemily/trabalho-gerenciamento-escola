import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../services/professor.service';
import { Professor } from '../models/professor.interface';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.page.html',
  styleUrls: ['./professores.page.scss'],
})
export class ProfessoresPage implements OnInit {

  professores: Professor[];

  constructor(
    private professorService: ProfessorService,
    private alertController: AlertController,
    private toast: ToastController
  ) { }

  ngOnInit() { }

  setFiltered(ev: any){
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      return this.professores = this.professores.filter((c) => {
        if (c.nome.toLowerCase().indexOf(val.toLowerCase()) > -1) {
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
    this.professores = await this.professorService.getProfessores().toPromise();
  }

  async confirmacaoExclusao(professor: Professor) {
    const alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o(a) professor(a) ${professor.nome}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => this.excluir(professor)
        },
        {
          text: 'Não'
        }
      ]
    });
    alerta.present();
  }

  private async excluir(professor: Professor) {

    this.professorService.excluir(professor).subscribe(() => {
      this.listar()
    },
    (response) => {
      this.toast.create({
        message: 'Não foi possível excluir o professor.',
        color: 'danger',
        duration: 3000,
        keyboardClose: true
      }).then(t => t.present());
    });
  }

}
