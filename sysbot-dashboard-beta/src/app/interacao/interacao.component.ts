import {Component, OnInit} from '@angular/core';
import {ConversasService} from "../conversas/conversas.service";
import {Filters} from "../models/filters";
import {OrderPipe} from "ngx-order-pipe";

@Component({
    selector: 'app-interacao',
    templateUrl: './interacao.component.html',
    styleUrls: ['./interacao.component.css']
})
export class InteracaoComponent implements OnInit {

    interacoes = [];

    entities = new Array();

    filter = new Filters();

    order: string = 'info.name';
    reverse: boolean = false;

    sortedCollection: any[];

    constructor(private conversasService: ConversasService, private orderPipe: OrderPipe) {
        this.sortedCollection = orderPipe.transform(this.interacoes, 'dateCreated');
        console.log(this.sortedCollection);
    }

    ngOnInit() {
        this.listarInteracoes();
    }


    listarInteracoes(){
        this.conversasService.getAllInterations(null, null, null, null, null).subscribe(response => {
            var json = JSON.stringify(response);
            var objectJson = JSON.parse(json);
            this.interacoes = objectJson;
            console.log(this.interacoes);
        });
    }

    pesquisarInteracoes(){
        this.conversasService.getAllInterations(this.filter.iduser, this.filter.dataInicio, this.filter.dataFinal, this.filter.interacao, this.filter.confianca).subscribe(response => {
            this.interacoes = response as [any];
            console.log(this.interacoes);
        });
    }


    pesquisarEntidades(id){
        this.interacoes.forEach(value => {
            if(value._id == id){
                var json = JSON.stringify(value.entities);
                var objectJson = JSON.parse(json);
                this.entities = objectJson;
            }
        });
    }

    setOrder(value: string) {
        if (this.order === value) {
            this.reverse = !this.reverse;
        }

        this.order = value;
    }

}
