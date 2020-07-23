import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoPollsPage } from './do-poll.page';

const routes: Routes = [
  {
    path: '',
    component: DoPollsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoPollsPageRoutingModule { }
