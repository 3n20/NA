import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LogsService {

  constructor(private http: HttpClient) { }


    listarLogs() {
        return this.http.get('http://' + window.location.hostname + ':8050/api/logs');
    }

}
