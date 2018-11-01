import { Component, OnInit } from '@angular/core';
import { LogsService } from './logs.service';
import {Log} from '../models/log';

@Component({
    selector: 'app-logs',
    templateUrl: './logs.component.html',
    styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

    constructor(private logService: LogsService) { }

    public loading = false;

    logs = new Log();

    logsTypeList: Array<any>;


    logsFilter: Array<any>;

    logType = '';

    filter;

    p;


    ngOnInit() {

        this.listarLogs();
        this.loadLogsType();
    }

    listarLogs() {
        this.loading = true;
        this.logService.listarLogs().subscribe(response => {

            console.log(response);
            this.logs = response as Log;
            this.logsFilter = this.logs.autenticador;
            this.loading = false;
        }, error2 => {
            console.log(error2);
            this.loading = false;
        });
    }




    filterLogsType() {
        console.log(this.logType);

        if(this.logType === 'autenticador') {
            this.logsFilter = this.logs.autenticador;
            console.log(this.logsFilter);
        } else if(this.logType === 'centralapi') {
            this.logsFilter = this.logs.centralapi;
        }else if(this.logType === 'dashboard') {
            this.logsFilter = this.logs.dashboard;
        }else if(this.logType === 'sysbot') {
            this.logsFilter = this.logs.sysbot;
        }else{
            this.logsFilter = this.logs.webhook;
        }
    }


    loadLogsType() {
        this.logsTypeList = [
            { value: 'autenticador', label: 'Autenticador' },
            { value: 'centralapi', label: 'Centralapi' },
            { value: 'dashboard', label: 'Dashboard' },
            { value: 'sysbot', label: 'Sysbot' },
            { value: 'webhook', label: 'Webhook' }
        ];
    }

}
