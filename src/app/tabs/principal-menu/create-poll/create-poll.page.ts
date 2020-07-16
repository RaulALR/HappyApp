import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-poll',
  templateUrl: 'create-poll.page.html',
  styleUrls: ['create-poll.page.scss']
})
export class CreatePollPage implements OnInit {
  public formGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public toastController: ToastController,
    public translateService: TranslateService) { }

  public saveData(event) {
    console.log(event, 'guardado');
    this.pollCreated();
  }

  public pollCreated() {
    this.presentToast();
    this.router.navigate(['/tabs']);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.translateService.instant('createPoll.pollCreated'),
      duration: 2000
    });
    toast.present();
  }

  private getPollForm() {
    return this.formBuilder.group({
      questions: this.formBuilder.group({
        question: ['', Validators.required]
      }),
      users: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.formGroup = this.getPollForm();
  }
}
