import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfessoresPage } from './professores.page';

const routes: Routes = [
  {
    path: '',
    component: ProfessoresPage
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'editar/:id',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfessoresPageRoutingModule {}
