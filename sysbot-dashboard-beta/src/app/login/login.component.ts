import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';


declare var $: any;
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    user: User = new User();
    isLoggedIn$: Observable<boolean>;

    constructor(private loginService: LoginService, private router: Router) { }

    ngOnInit() {
        this.isLoggedIn$ = this.loginService.isLoggedIn;

    }


    logar() {
        this.loginService.login(this.user);
    }

}
