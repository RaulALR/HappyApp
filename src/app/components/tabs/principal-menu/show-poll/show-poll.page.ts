import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { GetPoll } from 'src/app/redux/poll-reducer.ts/poll.actions';
import { selectPollList } from 'src/app/redux/poll-reducer.ts/poll.selector';
import { BaseComponent } from '../../../../core/shared/base.component';
import { UtilsService } from '../../../../core/shared/utils';
import { IAppState } from '../../../../redux/app.state';
import { pollForms } from './show-poll.forms';

@Component({
  selector: 'app-show-poll',
  templateUrl: 'show-poll.page.html',
  styleUrls: ['show-poll.page.scss']
})
export class ShowPollPage extends BaseComponent implements OnInit {
  public pollId: string;
  public pollData: any;

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

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.translateService.instant('showPoll.pollCreated'),
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    this.store.pipe(select(selectPollList)).subscribe((res) => {
      if (res.length > 0) {
        this.pollData = res[0];
      }
    });
  }
}
