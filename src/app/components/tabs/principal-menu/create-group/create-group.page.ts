import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../../core/shared/base.component';
import { IAppState } from '../../../../redux/app.state';
import { UtilsService } from '../../../../core/shared/utils';
import { Store, select } from '@ngrx/store';
import { groupForms } from './create-group.forms';
import { CreateGroup, UpdateGroup, GetGroup, DeleteGroup } from 'src/app/redux/group-reducer.ts/group.actions';
import { selectGroupList } from 'src/app/redux/group-reducer.ts/group.selector';

@Component({
  selector: 'app-create-group',
  templateUrl: 'create-group.page.html',
  styleUrls: ['create-group.page.scss']
})
export class CreateGroupPage extends BaseComponent implements OnInit {
  public formGroup: FormGroup;
  public isUpdate = false;
  public groupId: string;
  public repondentsData = [];

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
    this.formGroup = this.utils.buildForm(groupForms);
    this.utils.resetForm(this.formGroup);
  }

  public createGroup() {
    const params = {
      _id: this.groupId,
      groupName: this.formGroup.get('groupName').value ? this.formGroup.get('groupName').value : null,
      owner: this.formGroup.get('owner').value ? this.formGroup.get('owner').value : null,
      repondents: this.repondentsData || null
    };

    if (this.isUpdate) {
      this.store.dispatch(new UpdateGroup(params));
    } else {
      delete params._id;
      this.store.dispatch(new CreateGroup(params));
    }
    this.repondentsData = [];
  }

  public deleteGroup() {
    this.store.dispatch(new DeleteGroup({ _id: this.groupId }));
  }

  public getDisableDelete() {
    if (JSON.parse(sessionStorage.user).email === this.formGroup.get('owner').value) {
      return false;
    }
    return true;
  }

  private updateForm(data) {
    this.formGroup.get('groupName').setValue(data.groupName);
    this.formGroup.get('owner').setValue(data.owner);
    this.repondentsData = data.repondents;
  }

  public selectBackUrl() {
    if (this.isUpdate) {
      return 'tabs/view-groups';
    } else {
      return 'tabs/principal-menu';
    }
  }

  public addRepondent() {
    if (this.formGroup.get('repondents').value) {
      this.repondentsData.push(this.formGroup.get('repondents').value);
      this.formGroup.get('repondents').setValue('');
    }
  }

  public deleteRepondent(index) {
    this.repondentsData.splice(index, 1);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.isUpdate ? this.translateService.instant('groups.groupUpdated') : this.translateService.instant('groups.groupCreated'),
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
        this.formGroup.get('groupName').disable();
        this.formGroup.get('repondents').disable();
      }
    });
    this.activatedRoute.url.subscribe((res) => {
      const state = this.router.getCurrentNavigation().extras.state;
      this.isUpdate = state && state.data ? true : false;
      if (this.isUpdate) {
        this.groupId = state.data._id;
        this.store.dispatch(new GetGroup({ _id: state.data._id }));
      } else {
        this.utils.resetForm(this.formGroup);
        this.formGroup.get('owner').setValue(JSON.parse(sessionStorage.user).email);
      }
      this.formGroup.get('owner').disable();
    });
  }
}
