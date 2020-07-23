import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DoPollsPage } from './do-poll.page';

import { DoPollsPageRoutingModule } from './do-poll-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: DoPollsPage }]),
    DoPollsPageRoutingModule,
    TranslateModule
  ],
  declarations: [DoPollsPage]
})
export class DoPollsModule { }
