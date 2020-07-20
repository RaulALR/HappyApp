import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewGroupsPage } from './view-groups.page';

const routes: Routes = [
  {
    path: '',
    component: ViewGroupsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewGroupsPageRoutingModule {}
