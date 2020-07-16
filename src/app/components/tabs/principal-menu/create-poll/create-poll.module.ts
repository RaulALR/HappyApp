import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatePollPage } from './create-poll.page';

import { CreatePollPageRoutingModule } from './create-poll-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: CreatePollPage }]),
    CreatePollPageRoutingModule,
    TranslateModule
  ],
  declarations: [CreatePollPage]
})
export class CreatePollModule { }
