import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPollsPage } from './view-poll.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPollsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewPollsPageRoutingModule { }
