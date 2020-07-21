import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewPollsPage } from './view-poll.page';

import { ViewPollsPageRoutingModule } from './view-poll-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: ViewPollsPage }]),
    ViewPollsPageRoutingModule,
    TranslateModule
  ],
  declarations: [ViewPollsPage]
})
export class ViewPollsModule { }
