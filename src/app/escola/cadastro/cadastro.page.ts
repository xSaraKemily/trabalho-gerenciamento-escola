import { Component, OnInit } from '@angular/core';
import { EscolaService } from 'src/app/services/escola.service';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Escola } from 'src/app/models/escola.interface';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  escola: Escola;

  constructor(
    private escolaService : EscolaService,
    private navController : NavController,
    private loadingController : LoadingController,
    private activatedRoute : ActivatedRoute,
  ) {
    this.escola = { 
      nome: '',
      endereco: '',
      telefone: '',
      email: '',
      site: ''
     };
  }

  async ngOnInit() {
    const id = parseInt(this.activatedRoute.snapshot.params['id']);
    if(id) {
      const loading = await this.loadingController.create({message: 'Carregando'}); // Carregar as informações
            loading.present();

      this.escolaService.getEscola(id).subscribe((escola) => {
        this.escola = escola;
        loading.dismiss();
      });
    }
  }


  async salvar() {
    let loading = await this.loadingController.create({message: 'Salvando'});
        loading.present();

    this.escolaService
      .salvar(this.escola)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/escola']);
      });
  }
}
