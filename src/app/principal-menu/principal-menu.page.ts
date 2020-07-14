import { Component } from '@angular/core';
import { PrincipalMenuConstants } from './principal-menu.constants';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-principal-menu',
  templateUrl: 'principal-menu.page.html',
  styleUrls: ['principal-menu.page.scss']
})
export class PrincipalMenuPage {
  public principalMenuConstants;
  public buttons: any;

  constructor(public actionSheetController: ActionSheetController) {
    this.principalMenuConstants = PrincipalMenuConstants;
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
}
