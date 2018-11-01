import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ConversasService {



    constructor(private http: HttpClient) { }


    listarConversas() {
        return this.http.get('http://' + window.location.hostname + ':8050/api/todos');
    }

    findConversasPage(page, pageItens, iduser, dtInicio, dtFinal, orderBy) {
        var urlQuery;
        if(iduser){
            urlQuery += '&iduser=' + iduser;
        }
        if(dtInicio && dtFinal){
            urlQuery += '&dtInicio=' + dtInicio + '&dtFinal=' + dtFinal;
        }
        if(urlQuery) {
            return this.http.get('http://' + window.location.hostname + ':8050/api/conversation?page=' + page + '&pageItens=' + pageItens + urlQuery + '&orderBy=' + orderBy);
        }else{
            return this.http.get('http://' + window.location.hostname + ':8050/api/conversation?page=' + page + '&pageItens=' + pageItens + '&orderBy=' + orderBy);
        }
    }

    findConversasById(id) {
        return this.http.get('http://' + window.location.hostname + ':8050/api/conversation/find?id=' + id);
    }


    pesquisarConversasPorFiltro(idUser, idsubnetwork, idconversation) {
        return this.http.get('http://' + window.location.hostname + ':8050/api/getConversation/' + idUser + '/' + idsubnetwork + '/' + idconversation);
    }

    getAvalsAnalitic(tipoPesquisa){
        return this.http.get('http://' + window.location.hostname + ':8050/api/getAvalAnalitic?tipoPesquisa=' + tipoPesquisa);
    }

    getConfidenceAnalitic(tipoPesquisa){
        return this.http.get('http://' + window.location.hostname + ':8050/api/getConfidenceAnalitic?tipoPesquisa=' + tipoPesquisa);
    }

    getConversationDays(){
        return this.http.get('http://' + window.location.hostname + ':8050/api/conversation/days');
    }
    getConversationWeek(){
        return this.http.get('http://' + window.location.hostname + ':8050/api/conversation/week');
    }
    getConversationMonth(){
        return this.http.get('http://' + window.location.hostname + ':8050/api/conversation/month');
    }
    getConversationYear(){
        return this.http.get('http://' + window.location.hostname + ':8050/api/conversation/year');
    }

    getEntities(tipoPesquisa){
        return this.http.get('http://' + window.location.hostname + ':8050/api/entities?tipoPesquisa=' + tipoPesquisa);
    }

    getIntents(tipoPesquisa){
        return this.http.get('http://' + window.location.hostname + ':8050/api/intents?tipoPesquisa=' + tipoPesquisa);
    }


    getAllInterations(iduser, dtInicio, dtFinal, interacao, confianca){
        var urlQuery;
        if(iduser){
            urlQuery += '&iduser=' + iduser;
        }
        if(dtInicio && dtFinal){
            urlQuery += '&dtInicio=' + dtInicio + '&dtFinal=' + dtFinal;
        }
        if(confianca){
            urlQuery += '&confianca=' + confianca;
        }
        if(interacao){
            urlQuery += '&interacao=' + interacao;
        }


        if(urlQuery) {
            return this.http.get('http://' + window.location.hostname + ':8050/api/interations?' + urlQuery);
        }else{
            return this.http.get('http://' + window.location.hostname + ':8050/api/interations');
        }
    }


}
