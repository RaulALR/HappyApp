import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../../core/shared/base.component';
import { IAppState } from '../../../../redux/app.state';
import { UtilsService } from '../../../../core/shared/utils';
import { Store } from '@ngrx/store';
import { groupForms } from './create-group.forms';
import { CreateGroup } from 'src/app/redux/group-reducer.ts/group.actions';

@Component({
  selector: 'app-create-group',
  templateUrl: 'create-group.page.html',
  styleUrls: ['create-group.page.scss']
})
export class CreateGroupPage extends BaseComponent implements OnInit {
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
    this.formGroup = this.utils.buildForm(groupForms);
  }

  public createGroup() {
    const params = {
      groupName: this.formGroup.get('groupName').value ? this.formGroup.get('groupName').value : null,
      owner: this.formGroup.get('owner').value ? this.formGroup.get('owner').value : null,
      repondents: this.formGroup.get('repondents').value ? this.formGroup.get('repondents').value : null
    };
    this.store.dispatch(new CreateGroup(params));
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.translateService.instant('groups.groupCreated'),
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {

  }
}
