import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../../core/shared/base.component';
import { IAppState } from '../../../../redux/app.state';
import { UtilsService } from '../../../../core/shared/utils';
import { Store, select } from '@ngrx/store';
import { selectGroupList } from '../../../../redux/group-reducer.ts/group.selector';
import { IGroupData, IGetGroups } from '../../../../redux/redux-models/IGroup.model';
import { GetGroups, GetGroup } from '../../../../redux/group-reducer.ts/group.actions';

@Component({
  selector: 'app-view-groups',
  templateUrl: 'view-groups.page.html',
  styleUrls: ['view-groups.page.scss']
})
export class ViewGroupsPage extends BaseComponent implements OnInit {
  public groupsData: IGroupData[];

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

  public navigateToGroup(item) {
    this.store.dispatch(new GetGroup({ _id: item._id }));
  }

  private getGroups() {
    const params: IGetGroups = {
      owner: JSON.parse(sessionStorage.user).email
    };
    this.store.dispatch(new GetGroups(params));
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.translateService.instant('groups.groupCreated'),
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    this.store.pipe(select(selectGroupList)).subscribe((res) => {
      if (res.length > 0 && res[0].owner) {
        this.groupsData = res;
      }
    });

    this.activatedRoute.url.subscribe((res) => {
      this.getGroups();
    });
  }
}
