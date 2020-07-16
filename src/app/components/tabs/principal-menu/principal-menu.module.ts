import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrincipalMenuPage } from './principal-menu.page';

import { PrincipalMenuPageRoutingModule } from './principal-menu-routing.module';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: PrincipalMenuPage }]),
    PrincipalMenuPageRoutingModule,
    TranslateModule
  ],
  declarations: [PrincipalMenuPage]
})
export class PrincipalMenuModule {}
