import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../../core/shared/base.component';
import { IAppState } from '../../../../redux/app.state';
import { UtilsService } from '../../../../core/shared/utils';
import { Store, select } from '@ngrx/store';
import { selectPollList } from '../../../../redux/poll-reducer.ts/poll.selector';
import { IPollData, IGetPolls } from '../../../../redux/redux-models/IPoll.model';
import { GetPolls, GetPoll } from '../../../../redux/poll-reducer.ts/poll.actions';

@Component({
  selector: 'app-do-poll',
  templateUrl: 'do-poll.page.html',
  styleUrls: ['do-poll.page.scss']
})
export class DoPollsPage extends BaseComponent implements OnInit {
  public pollData: IPollData;
  public pollId = '';
  public pollAnswer = [];

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
  }

  public navigateToPoll(item) {
    this.store.dispatch(new GetPoll({ _id: item._id }));
  }

  public addAnswer(index, res) {
    this.pollAnswer[index] = res;
  }

  public getFullAnswer() {
    let state = true;
    if (this.pollData && this.pollData.questions && this.pollAnswer.length === this.pollData.questions.length) {
      state = false;
      for (const iterator of this.pollAnswer) {
        if (!iterator) {
          state = true;
        }

      }
    }

    return state;
  }

  public sendAnswer() {
    return true;
  }

  private getPolls() {
    const params: IGetPolls = {
      user: JSON.parse(sessionStorage.user).email
    };
    this.store.dispatch(new GetPolls(params));
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.translateService.instant('doPolls.pollCreated'),
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    this.store.pipe(select(selectPollList)).subscribe((res) => {
      if (Array.isArray(res)) {
        this.pollData = res[0];
      }
    });

    this.activatedRoute.url.subscribe((res) => {
      const state = this.router.getCurrentNavigation().extras.state;
      if (state && state.data) {
        this.pollId = state.data._id;
        this.store.dispatch(new GetPoll({ _id: state.data._id }));
      }
    });
  }
}
