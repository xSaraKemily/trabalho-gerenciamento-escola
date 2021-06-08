import { Component, OnInit } from '@angular/core';
import { CursoService } from '../services/curso.service';
import { Curso } from '../models/curso.interface';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {

  cursos: Curso[];

  constructor(
    private cursoService: CursoService,
    private alertController: AlertController
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.listar();
  }

  setFiltered(ev: any){
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      return this.cursos = this.cursos.filter((c) => {
        if (c.nome.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return true;
        }
   
         return false;
      });
    } else {
      this.listar();
    }
  }

  async listar() {
    this.cursos = await this.cursoService.getCursos().toPromise();
  }

  async confirmacaoExclusao(curso: Curso) {
    const alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o curso ${curso.nome}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => this.excluir(curso)
        },
        {
          text: 'Não'
        }
      ]
    });
    alerta.present();
  }

  private async excluir(curso: Curso) {

    this.cursoService.excluir(curso).subscribe(() => {
      this.listar()
    });
  }

}
