import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { EscolaService } from '../services/escola.service';
import { Escola } from '../models/escola.interface';

@Component({
  selector: 'app-escola',
  templateUrl: './escola.page.html',
  styleUrls: ['./escola.page.scss'],
})
export class EscolaPage implements OnInit {

  escola: Escola[];

  constructor(
    private alertController: AlertController,
    private escolaService: EscolaService,
  ) { }

  ngOnInit() {
  }

  setFiltered(ev: any){
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      return this.escola = this.escola.filter((c) => {
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
    this.escolaService.getEscolas().subscribe((data) => {
      this.escola = data;
    });
  }

  async confirmarExclusao(escola: Escola) {
    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir a escola ${escola.nome}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(escola);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

  private async excluir(escola: Escola) {

    this.escolaService.excluir(escola).subscribe(() => {
      this.listar()
    });
  }

}
