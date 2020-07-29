import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowPollPage } from './show-poll.page';

import { ShowPollPageRoutingModule } from './show-poll-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: ShowPollPage }]),
    ShowPollPageRoutingModule,
    TranslateModule
  ],
  declarations: [ShowPollPage]
})
export class ShowPollModule { }
