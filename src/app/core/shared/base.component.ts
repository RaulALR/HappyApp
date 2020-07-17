import { GlobalConstants } from './constants/global.constants';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/redux/app.state';
import { OnDestroy } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from './utils';

@AutoUnsubscribe()
export class BaseComponent implements OnDestroy {
    public globalConstants = GlobalConstants;

    constructor(
        public store: Store<IAppState>,
        public utils: UtilsService,
        public translate: TranslateService,
    ) { }

    ngOnDestroy() { }
}
