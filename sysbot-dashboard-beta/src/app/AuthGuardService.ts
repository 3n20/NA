import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login/login.service';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(
        private authService: LoginService,
        private router: Router
    ) {}

    canActivate() {
        if(this.authService.isAuthenticated()) {
            return true;
        } else {
            this.router.navigate(['dashboard']);
            return false;
        }
    }
}