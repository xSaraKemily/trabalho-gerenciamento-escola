import { Component, OnInit } from '@angular/core';
import { AlunoService } from '../services/aluno.service';
import { Aluno } from '../models/aluno.interface';
import { LoadingController, AlertController } from '@ionic/angular';
import { BusyLoaderService } from '../services/busy-loader.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './aluno.page.html',
  styleUrls: ['./aluno.page.scss'],
})
export class AlunosPage implements OnInit {

  alunos: Aluno[];
  
  constructor(
    private alunoService: AlunoService,
    private busyLoader: BusyLoaderService,
    private alertController: AlertController
  ) { }

  ionViewWillEnter() {
    this.listar();
  }

  setFiltered(ev: any){
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      return this.alunos = this.alunos.filter((aluno) => {
        if (aluno.nome.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return true;
         }
   
         return false;
      });
    } else {
      this.listar();
    }
  }

  ngOnInit() { }

  async listar() {
    const busyLoader = await this.busyLoader.create('Carregando alunos ...');
    this.alunos = await this.alunoService.getAlunos().toPromise();
    busyLoader.dismiss();
  }

  async confirmacaoExclusao(aluno: Aluno) {
    const alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o curso ${aluno.nome}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => this.excluir(aluno)
        },
        {
          text: 'Não'
        }
      ]
    });
    alerta.present();
  }

  private async excluir(aluno: Aluno) {
    const busyLoader = await this.busyLoader.create('Excluíndo ...');

    this.alunoService.excluir(aluno).subscribe(() => {
      this.listar()
      busyLoader.dismiss();
    });
  }


}
