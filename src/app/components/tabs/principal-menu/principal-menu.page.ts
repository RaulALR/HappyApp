import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/core/shared/base.component';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../redux/app.state';
import { UtilsService } from '../../../core/shared/utils';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-principal-menu',
  templateUrl: 'principal-menu.page.html',
  styleUrls: ['principal-menu.page.scss']
})
export class PrincipalMenuPage extends BaseComponent {
  public principalMenuConstants;
  public buttons: any;

  constructor(
    public actionSheetController: ActionSheetController,
    private router: Router,
    public store: Store<IAppState>,
    public utils: UtilsService,
    public translateService: TranslateService,
  ) {
    super(store, utils, translateService);
  }
  async openActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'caret-forward-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  public navigateTo(url: string): void {
    this.router.navigate([url]);
  }
}
