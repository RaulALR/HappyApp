import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { GetGroups } from 'src/app/redux/group-reducer.ts/group.actions';
import { selectGroupList } from 'src/app/redux/group-reducer.ts/group.selector';
import { CreatePoll, DeletePoll, GetPoll, UpdatePoll } from 'src/app/redux/poll-reducer.ts/poll.actions';
import { selectPollList } from 'src/app/redux/poll-reducer.ts/poll.selector';
import { BaseComponent } from '../../../../core/shared/base.component';
import { UtilsService } from '../../../../core/shared/utils';
import { IAppState } from '../../../../redux/app.state';
import { pollForms } from './create-poll.forms';

@Component({
  selector: 'app-create-poll',
  templateUrl: 'create-poll.page.html',
  styleUrls: ['create-poll.page.scss']
})
export class CreatePollPage extends BaseComponent implements OnInit {
  public formGroup: FormGroup;
  public isUpdate = false;
  public pollId: string;
  public groupData = [];
  public questionData = [];

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
      questions: this.questionData || null,
      owner: JSON.parse(sessionStorage.user).email
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

  public getDisableDelete() {
    let state = true;
    if (this.groupData && this.formGroup.get('groupPoll').value) {
      this.groupData.forEach((item) => {
        if (item.groupName === this.formGroup.get('groupPoll').value &&
          item.owner === JSON.parse(sessionStorage.user).email) {
          this.formGroup.get('groupPoll').enable();
          state = false;
        }
      });
    }
    return state;
  }

  public showButtons() {
    return this.isUpdate ? this.groupData && this.groupData[0] && this.groupData[0].owner === JSON.parse(sessionStorage.user).email : true;
  }

  public compareWithGroup = (lastValue, newValue) => {
    return lastValue === newValue;
  }

  public deletePoll() {
    this.store.dispatch(new DeletePoll({ _id: this.pollId }));
  }

  public addQuestion() {
    if (this.formGroup.get('questions').value) {
      this.questionData.push(this.formGroup.get('questions').value);
      this.formGroup.get('questions').setValue('');
    }
  }

  public deleteQuestion(index) {
    this.questionData.splice(index, 1);
  }

  private updateForm(data) {
    this.formGroup.get('pollName').setValue(data.pollName);
    this.formGroup.get('groupPoll').setValue(data.groupPoll);
    this.questionData = data.questions;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.translateService.instant('createPoll.pollCreated'),
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    this.store.pipe(select(selectPollList)).subscribe((res) => {
      if (res.length > 0 && this.isUpdate) {
        this.updateForm(res[0]);
      }
    });

    this.store.pipe(select(selectGroupList)).subscribe(res => {
      if (Array.isArray(res)) {
        this.groupData = res;
      }
    });

    this.activatedRoute.url.subscribe((res) => {
      const state = this.router.getCurrentNavigation().extras.state;
      this.isUpdate = state && state.data ? true : false;
      this.store.dispatch(new GetGroups({ owner: JSON.parse(sessionStorage.user).email }));
      if (this.isUpdate) {
        this.formGroup.get('groupPoll').disable();
        this.pollId = state.data._id;
        this.store.dispatch(new GetPoll({ _id: state.data._id }));
      } else {
        this.utils.resetForm(this.formGroup);
      }
    });
  }
}
