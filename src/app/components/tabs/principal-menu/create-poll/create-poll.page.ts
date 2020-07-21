import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../../core/shared/base.component';
import { IAppState } from '../../../../redux/app.state';
import { UtilsService } from '../../../../core/shared/utils';
import { Store, select } from '@ngrx/store';
import { pollForms } from './create-poll.forms';
import { selectGroupList } from 'src/app/redux/group-reducer.ts/group.selector';
import { GetGroup } from 'src/app/redux/group-reducer.ts/group.actions';
import { GetPoll, CreatePoll, UpdatePoll } from 'src/app/redux/poll-reducer.ts/poll.actions';

@Component({
  selector: 'app-create-poll',
  templateUrl: 'create-poll.page.html',
  styleUrls: ['create-poll.page.scss']
})
export class CreatePollPage extends BaseComponent implements OnInit {
  public formGroup: FormGroup;
  public isUpdate = false;
  public pollId: string;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public toastController: ToastController,
    public store: Store<IAppState>,
    public utils: UtilsService,
    public translateService: TranslateService,
    public activatedRoute: ActivatedRoute
  ) {
    super(store, utils, translateService);
    this.formGroup = this.utils.buildForm(pollForms);
    this.utils.resetForm(this.formGroup);
  }

  public saveData() {
    const params = {
      _id: this.pollId,
      pollName: this.formGroup.get('pollName').value ? this.formGroup.get('pollName').value : null,
      groupPoll: this.formGroup.get('groupPoll').value ? this.formGroup.get('groupPoll').value : null,
      questions: this.formGroup.get('questions').value ? this.formGroup.get('questions').value : null
    };

    if (this.isUpdate) {
      this.store.dispatch(new UpdatePoll(params));
    } else {
      delete params._id;
      this.store.dispatch(new CreatePoll(params));
    }

  }

  public pollCreated() {
    this.presentToast();
    this.router.navigate(['/tabs']);
  }

  private updateForm(data) {
    this.formGroup.get('pollName').setValue(data.pollName);
    this.formGroup.get('groupPoll').setValue(data.groupPoll);
    this.formGroup.get('questions').setValue(data.questions);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.translateService.instant('createPoll.pollCreated'),
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    this.store.pipe(select(selectGroupList)).subscribe((res) => {
      if (res.length > 0 && res[0].owner && this.isUpdate) {
        this.updateForm(res[0]);
      }
      if (res[0] && res[0].owner !== JSON.parse(sessionStorage.user).email && this.isUpdate) {
        // this.formGroup.get('groupName').disable();
        // this.formGroup.get('repondents').disable();
      }
    });
    this.activatedRoute.url.subscribe((res) => {
      const state = this.router.getCurrentNavigation().extras.state;
      this.isUpdate = state && state.data ? true : false;
      if (this.isUpdate) {
        this.pollId = state.data._id;
        this.store.dispatch(new GetPoll({ _id: state.data._id }));
      } else {
        this.utils.resetForm(this.formGroup);
      }
    });
  }
}
