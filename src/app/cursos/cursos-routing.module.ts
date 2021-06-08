import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursosPage } from './cursos.page';

const routes: Routes = [
  {
    path: '',
    component: CursosPage
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
export class CursosPageRoutingModule {}
