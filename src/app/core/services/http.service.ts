import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
@Injectable()
export class HttpService {

    constructor(
        private http: HttpClient
    ) { }

    callBackEnd(url: string, verb: string, params?: any, headers?: HttpHeaders) {
        url = `${environment.apiUrl}/${url}`;
        switch (verb) {
            case 'GET':
                return this.http.get<any>(url, { params, headers });
            case 'POST':
                return this.http.post<any>(url, params, { headers });
            case 'PUT':
                return this.http.put<any>(url, { params, headers });
            case 'PATCH':
                return this.http.patch<any>(url, { params, headers });
        }
    }
}
