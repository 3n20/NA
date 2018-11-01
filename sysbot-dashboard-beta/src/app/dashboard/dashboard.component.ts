import { Component, OnInit } from '@angular/core';
import { ConversasService } from '../conversas/conversas.service';
import { Conversa } from '../models/conversa';
import { Charts } from '../models/charts';

import { Chart } from 'chart.js';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    conversationsDashboard = Array();

    private topInterations = [];

    entitiesResult = [];

    public topEntities = [];

    public loading = false;

    selectDateEntities;

    selectDateIntentes;

    selectDateConfianca;

    selectDateAval;

    chartHours = [];

    chartWeek = [];

    chartDay = [];

    chartYear = [];

    chartEval = [];

    chartConf;

    public isCartConfVisible = true;

    public isCartEvalVisible = true;

    msgCharts;

    constructor(private conversaService: ConversasService) {
    }



    ngOnInit() {
        this.getAval();
        this.topEntitiesFunc();
        this.topInteracoes();
        this.confiabilidade();


        this.chartsDay();
        this.chartsMonth();
        this.chartsWeek();
        this.chartsHours();
    }

    async chartsHours() {
        await this.conversaService.getConversationDays().subscribe(response => {
            this.chartHours = new Chart('canvasHours', {
                type: 'line',
                data: {
                    labels: ['00h', '', '02h', '', '04h', '', '06h', '', '08h', '', '10h', '', '12h', '', '14h', '', '16h', '', '18h', '', '20h', '', '22h', ''],
                    datasets: [
                        {
                            data: response,
                            borderColor: "#ffffff",
                            fill: false
                        }
                    ]
                },
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            fontColor: '#ffffff'
                        }],
                        yAxes: [{
                            display: true,
                            fontColor: '#ffffff'
                        }],
                    }
                }
            });
        });

    }

    private chartsWeek() {
        this.conversaService.getConversationWeek().subscribe(response => {
            this.chartWeek = new Chart('canvasWeek', {
                type: 'line',
                data: {
                    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
                    datasets: [
                        {
                            data: response,
                            borderColor: "#ffffff",
                            fill: false
                        }
                    ]
                },
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            fontColor: '#ffffff'
                        }],
                        yAxes: [{
                            display: true,
                            fontColor: '#ffffff'
                        }]
                    }
                }
            });
        });
    }

    private chartsMonth() {
        this.conversaService.getConversationYear().subscribe(response => {
            this.chartYear = new Chart('canvasYear', {
                type: 'line',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                    datasets: [
                        {
                            data: response,
                            borderColor: "#ffffff",
                            fill: false
                        }
                    ]
                },
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            fontColor: '#ffffff'
                        }],
                        yAxes: [{
                            display: true,
                            fontColor: '#ffffff'
                        }],
                    },
                }
            });
        });
    }

    private chartsDay() {
        this.conversaService.getConversationMonth().subscribe(response => {
            this.chartDay = new Chart('canvasDay', {
                type: 'line',
                data: {
                    labels: ['1', '', '3', '', '5', '', '7', '', '9', '', '11', '', '13', '', '15', '', '17', '', '19', '', '21', '', '23', '', '25', '', '27', '', '29', '', '31'],
                    datasets: [
                        {
                            data: response,
                            borderColor: "#ffffff",
                            fill: false
                        }
                    ]
                },
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            fontColor: '#ffffff'
                        }],
                        yAxes: [{
                            display: true,
                            fontColor: '#ffffff'
                        }],
                    },
                }
            });
        });
    }


    listarTodosConversas() {
        this.loading = true;
        this.conversaService.listarConversas().subscribe(response => {
            const result = response as Conversa;

            const conversations = result.conversation;
            const entities = result.entities;
            const interactions = result.interactions;

            const intents = result.intents;

            this.loading = false;

        }, error2 => {
            this.loading = false;
        });
    }

    public topEntitiesFunc() {
        this.conversaService.getEntities(this.selectDateEntities).subscribe(response => {
            this.topEntities = response as [any];
            console.log(this.topEntities);
        }, error2 => {
            this.loading = false;
        });

    }

    public topInteracoes() {
        this.conversaService.getIntents(this.selectDateIntentes).subscribe(response => {
            this.topInterations = response as [any];
        }, error2 => {
            this.loading = false;
        });
    }

    private getAval() {

        this.conversaService.getAvalsAnalitic(this.selectDateAval).subscribe(response => {
            if(response) {
                var aval = {
                    "positive": response[2].count,
                    "negative": response[1].count,
                    "none": response[0].count
                }


                const avaliacaoChart = [
                    aval.none, aval.negative, aval.positive
                ];

                const data = {
                    datasets: [{
                        data: avaliacaoChart,
                        backgroundColor: [
                            '#0971B2', '#B21212', '#009962']
                    }],

                    labels: [
                        'NULO',
                        'NEGATIVO',
                        'POSITIVO'
                    ]

                };
                this.isCartEvalVisible = true;
                this.chartEval = new Chart('canvasEval', {
                    type: 'doughnut',
                    data: data
                });
            }else{
                this.isCartEvalVisible = false;
                this.msgCharts = 'Nenhum registro encontrado.'
            }
        });
    }

    async confiabilidade(){

        await this.conversaService.getConfidenceAnalitic(this.selectDateConfianca).subscribe(response => {
            if(response) {

                var str = JSON.stringify(response);
                var json = JSON.parse(str);
                const avaliacaoChart = [
                    json.semConfianca, json.confiancaBaixa, json.confiacaMedia, json.confiancaAlta
                ];

                const data = {
                    datasets: [{
                        data: avaliacaoChart,
                        backgroundColor: [
                            '#B21212', '#FF6E5Ecd', '#FFEC00', '#009962']
                    }],
                    labels: [
                        'SEM CONFIANÇA',
                        'CONFIANÇA BAIXA',
                        'CONFIANÇA MÉDIA',
                        'CONFIANÇA ALTA',
                    ]
                };
                this.chartConf = new Chart('canvasConf', {
                    type: 'doughnut',
                    data: data
                });
                this.isCartConfVisible = true;
            } else {
                this.isCartConfVisible = false;
                this.msgCharts = 'Nenhum registro encontrado.'
            }
        });
    }
}


