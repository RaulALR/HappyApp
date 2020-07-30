import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/core/shared/base.component';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../redux/app.state';
import { UtilsService } from '../../../core/shared/utils';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage extends BaseComponent {

  constructor(
    public actionSheetController: ActionSheetController,
    public router: Router,
    public toastController: ToastController,
    public store: Store<IAppState>,
    public utils: UtilsService,
    public translateService: TranslateService,
    public authService: AuthService
  ) {
    super(store, utils, translateService);
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
    this.authService.logout();
    this.router.navigate(['/login-register-main']);
  }
}
