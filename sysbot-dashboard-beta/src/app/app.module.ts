import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';

import {AppComponent} from './app.component';

import {DashboardComponent} from './dashboard/dashboard.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {ConversasComponent} from './conversas/conversas.component';
import {ConversasService} from './conversas/conversas.service';
import {LogsService} from './logs/logs.service';
import {LoginService} from './login/login.service';

import {ExtractComponent} from './extract/extract.component';
import {LogsComponent} from './logs/logs.component';
import {LoginComponent} from './login/login.component';
import {UpgradeComponent} from './upgrade/upgrade.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {Ng2OrderModule} from 'ng2-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';

import {LoadingModule} from 'ngx-loading';

import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatNativeDateModule} from "@angular/material";

import { LayoutModule } from '@angular/cdk/layout';
import { InteracaoComponent } from './interacao/interacao.component';
import { OrderModule } from 'ngx-order-pipe';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserProfileComponent, ConversasComponent,
      ExtractComponent, LogsComponent,
    LoginComponent,
    UpgradeComponent,
    InteracaoComponent

  ],
  imports: [
    BrowserModule,
    FormsModule, HttpModule, HttpClientModule, ComponentsModule, RouterModule,
    AppRoutingModule,
      BrowserAnimationsModule,
      Ng2SearchPipeModule,
      Ng2OrderModule,
      NgxPaginationModule,
      LoadingModule,
      MatDatepickerModule,
      MatNativeDateModule,
      LayoutModule,
      NgxPaginationModule,
      OrderModule
  ],
  providers: [HttpClientModule, ConversasService, LogsService, LoginService, MatNativeDateModule],
  bootstrap: [AppComponent],
    schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
