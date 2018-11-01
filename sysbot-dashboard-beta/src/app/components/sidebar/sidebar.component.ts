import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LoginService} from '../../login/login.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '../dashboard', title: 'Dashboard',  icon: 'dashboard', class: 'active' },
    { path: '../conversas', title: 'Conversas',  icon: 'chat', class: '' },
    { path: '../interacao', title: 'Interações',  icon: 'chat', class: '' },
    { path: '../logs', title: 'Logs Servidor',  icon: 'content_paste', class: '' },
    { path: '../extrair', title: 'Extrair Dados',  icon: 'library_books', class: '' }
    // { path: 'analizer', title: 'Tone Analizer',  icon: 'bubble_chart', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

    isLoggedIn$: Observable<boolean>;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
      this.isLoggedIn$ = this.loginService.isLoggedIn;
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
