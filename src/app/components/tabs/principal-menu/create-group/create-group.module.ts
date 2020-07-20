import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateGroupPage } from './create-group.page';

import { CreateGroupPageRoutingModule } from './create-group-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: CreateGroupPage }]),
    CreateGroupPageRoutingModule,
    TranslateModule
  ],
  declarations: [CreateGroupPage]
})
export class CreateGroupModule { }
