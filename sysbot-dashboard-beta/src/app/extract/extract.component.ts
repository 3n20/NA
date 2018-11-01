import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
    selector: 'app-typography',
    templateUrl: './extract.component.html',
    styleUrls: ['./extract.component.css']
})
export class ExtractComponent implements OnInit {

    constructor(private http: HttpClient) { }

    ngOnInit() {
    }

    extrairJSON() {
        return this.http.get('https://gateway.watsonplatform.net/conversation/api/v1/workspaces/0766f729-6ebc-44a5-bb76-9903e3449190/logs?version=2018-02-16&page_limit=500&filter=request_timestamp%3E2017-05-20,request.input.text::!%22reset%22&sort=-request_timestamp').subscribe(result => {
           console.log(result);
        });
    }
}
