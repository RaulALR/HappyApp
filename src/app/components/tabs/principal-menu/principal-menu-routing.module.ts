import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalMenuPage } from './principal-menu.page';

const routes: Routes = [
  {
    path: '',
    component: PrincipalMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalMenuPageRoutingModule {}
