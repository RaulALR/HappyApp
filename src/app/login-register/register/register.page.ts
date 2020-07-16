import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss']
})
export class RegisterPage {

  constructor(
    public toastController: ToastController,
    public translateService: TranslateService,
    public router: Router) { }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.translateService.instant('register.userSignUp'),
      duration: 2000
    });
    toast.present();
  }

  public signUp() {
    this.presentToast();
    this.router.navigate(['/login-register-main']);
  }

}
