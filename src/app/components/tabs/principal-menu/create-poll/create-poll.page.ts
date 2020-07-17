import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../../core/shared/base.component';
import { IAppState } from '../../../../redux/app.state';
import { UtilsService } from '../../../../core/shared/utils';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-create-poll',
  templateUrl: 'create-poll.page.html',
  styleUrls: ['create-poll.page.scss']
})
export class CreatePollPage extends BaseComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public toastController: ToastController,
    public store: Store<IAppState>,
    public utils: UtilsService,
    public translateService: TranslateService
  ) {
    super(store, utils, translateService);
  }

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
