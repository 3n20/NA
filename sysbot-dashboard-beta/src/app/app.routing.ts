import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {ConversasComponent} from './conversas/conversas.component';
import {ExtractComponent} from './extract/extract.component';
import {LogsComponent} from './logs/logs.component';
import {UpgradeComponent} from './upgrade/upgrade.component';
import {InteracaoComponent} from "./interacao/interacao.component";

const routes: Routes =[
    { path: 'dashboard',      component: DashboardComponent},
    { path: 'conversas',      component: ConversasComponent},
    { path: 'interacao',      component: InteracaoComponent},
    { path: 'logs',           component: LogsComponent},
    { path: 'extrair',        component: ExtractComponent},
    { path: 'conversas',      component: ConversasComponent},
    { path: 'upgrade',        component: UpgradeComponent},
    { path: '',               redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
