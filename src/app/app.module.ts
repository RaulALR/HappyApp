import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './redux/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './redux/auth-reducer.ts/auth.effects';
import { HttpService } from './core/services/http.service';
import { AuthService } from './core/services/auth.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UtilsService } from './core/shared/utils';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupEffects } from './redux/group-reducer.ts/group.effects';
import { PollEffects } from './redux/poll-reducer.ts/poll.effects';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([AuthEffects, GroupEffects, PollEffects]),
    StoreDevtoolsModule.instrument(),
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(),
    AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    HttpService,
    UtilsService,
    AuthService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
