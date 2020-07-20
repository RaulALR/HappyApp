import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewGroupsPage } from './view-groups.page';

import { ViewGroupsPageRoutingModule } from './view-groups-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: ViewGroupsPage }]),
    ViewGroupsPageRoutingModule,
    TranslateModule
  ],
  declarations: [ViewGroupsPage]
})
export class ViewGroupsModule { }
