import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {
  public translateService: TranslateService;

  constructor(translate: TranslateService, public actionSheetController: ActionSheetController) {
    this.translateService = translate;
    this.translateService.setDefaultLang('es');
    this.translateService.use('es');
  }

  async openLenguageActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: this.translateService.instant('settings.languages'),
      cssClass: 'my-custom-class',
      buttons: [{
        text: this.translateService.instant('settings.spanish'),
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.setLanguage('es');
        }
      }, {
        text: this.translateService.instant('settings.english'),
        icon: 'share',
        handler: () => {
          this.setLanguage('en');
        }
      }]
    });
    await actionSheet.present();
  }

  public setLanguage(lang: string): void {
    this.translateService.use(lang);
  }
}
