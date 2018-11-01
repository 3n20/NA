import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router} from '@angular/router';
import * as $ from 'jquery';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LoginService {

    constructor(private http: HttpClient, private router: Router) { }

    private loggedIn = new BehaviorSubject<boolean>(false);

    public loading = false;

    login(user) {
        this.loading = true;
        return this.http.post('http://localhost:8050/autentica', {'login': user.login, 'password': user.password}, {}).subscribe(response => {
            if(response) {
                localStorage.setItem('currentUser', JSON.stringify(response));
                this.loggedIn.next(true);
                this.router.navigate(['dashboard']);
                localStorage.setItem('user', JSON.stringify(response));
                this.loading = false;
                return response;
            }else {
                this.loading = false;
                return response;
            }
        }, error2 => {
            this.loading = false;
            return error2;
        });

    }

    isAuthenticated() {
        let token = localStorage.getItem('currentUser');

        if (token) {
            return true;
        }

        return false;
    }

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    logout() {
        this.loggedIn.next(false);
        localStorage.removeItem('currentUser');
        this.router.navigate(['login']);
    }
}
