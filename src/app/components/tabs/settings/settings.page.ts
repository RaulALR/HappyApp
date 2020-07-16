import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {
  public translateService: TranslateService;

  constructor(
    translate: TranslateService,
    public actionSheetController: ActionSheetController,
    public router: Router,
    public toastController: ToastController) {
    this.translateService = translate;
    this.translateService.setDefaultLang('es');
    this.translateService.use('es');
  }

  async openLenguageActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: this.translateService.instant('settings.languages'),
      buttons: [{
        text: this.translateService.instant('settings.spanish'),
        handler: () => {
          this.setLanguage('es');
        }
      }, {
        text: this.translateService.instant('settings.english'),
        handler: () => {
          this.setLanguage('en');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.translateService.instant('settings.closeSessionToast'),
      duration: 2000
    });
    toast.present();
  }

  public setLanguage(lang: string): void {
    this.translateService.use(lang);
  }

  public closeSession() {
    this.presentToast();
    this.router.navigate(['/login-register-main']);
  }
}
