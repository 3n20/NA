import {Component, OnInit} from '@angular/core';

import {ConversasService} from './conversas.service';
import {Filters} from "../models/filters";
import {Pagination} from "../models/pagination";
import * as moment from 'moment';
import {OrderPipe} from "ngx-order-pipe";


@Component({
    selector: 'app-conversas',
    templateUrl: './conversas.component.html',
    styleUrls: ['./conversas.component.css']
})
export class ConversasComponent implements OnInit {

    order: string = 'info.name';
    reverse: boolean = false;

    sortedCollection: any[];

    constructor(private conversasService: ConversasService, private orderPipe: OrderPipe) {
        this.sortedCollection = orderPipe.transform(this.conversations, 'dt_created');
        console.log(this.sortedCollection);
    }

    public loading = false;

    public conversations = new Array();

    conversation;

    p;

    logConversas;

    conversationLog;

    filter = new Filters();

    model;

    pagination: Pagination = new Pagination();

    orderBy = "-1";


    ngOnInit() {
        this.listarTodosConversas();
    }


    listarTodosConversas() {
        this.loading = true;
        this.conversasService.findConversasPage(0, 0, null, null, null, this.orderBy).subscribe(response => {
            console.log(response);
            var json = JSON.stringify(response);
            var objectJson = JSON.parse(json);
            this.conversations = objectJson.body as Array<any>;
            this.pagination = objectJson.pagination;

            console.log('----------' + this.conversations);
            this.loading = false;
        }, error2 => {
            console.log('erro: ' + JSON.stringify(error2));
            this.loading = false;
        });
    }

    listarConversasPorFiltro(){
        this.loading = true;
        this.conversasService.findConversasPage(1, 2, this.filter.iduser, moment(this.filter.dataInicio, 'DD/MM/YYYY', this.orderBy).format('DD/MM/YYYY'), moment(this.filter.dataFinal, 'DD/MM/YYYY').format('DD/MM/YYYY'), this.orderBy).subscribe(response => {
            console.log(response);
            var json = JSON.stringify(response);
            var objectJson = JSON.parse(json);
            this.conversations = objectJson.body as Array<any>;
            console.log('----------' + this.conversations);
            this.loading = false;
        }, error2 => {
            console.log('erro: ' + JSON.stringify(error2));
            this.loading = false;
        });
    }

    pesquisarConversa(id) {
        this.loading = true;

        this.conversasService.findConversasById(id).subscribe(response => {
            var json = JSON.stringify(response);
            var objectJson = JSON.parse(json);
            this.conversationLog = objectJson;
            this.loading = false;
        });
    }

    parseDate(dateString: string): Date {
        if (dateString) {
            return moment(dateString).toDate();
        } else {
            return null;
        }
    }

    setOrder(value: string) {
        if (this.order === value) {
            this.reverse = !this.reverse;
        }

        this.order = value;
    }
}
