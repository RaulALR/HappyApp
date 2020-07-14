import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrincipalMenuPage } from './principal-menu.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { PrincipalMenuPageRoutingModule } from './principal-menu-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: PrincipalMenuPage }]),
    PrincipalMenuPageRoutingModule,
  ],
  declarations: [PrincipalMenuPage]
})
export class PrincipalMenuModule {}
