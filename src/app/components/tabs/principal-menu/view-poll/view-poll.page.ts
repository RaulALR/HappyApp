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
  selector: 'app-view-poll',
  templateUrl: 'view-poll.page.html',
  styleUrls: ['view-poll.page.scss']
})
export class ViewPollsPage extends BaseComponent implements OnInit {
  public pollsData: IPollData[];

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

  private getPolls() {
    const params: IGetPolls = {
      user: JSON.parse(sessionStorage.user).email
    };
    this.store.dispatch(new GetPolls(params));
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.translateService.instant('viewPolls.pollCreated'),
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    this.store.pipe(select(selectPollList)).subscribe((res) => {
      this.pollsData = res;
      // if (res.length > 0 && res[0].owner) {
      //   this.pollsData = res;
      // }
    });

    this.activatedRoute.url.subscribe((res) => {
      this.getPolls();
    });
  }
}
