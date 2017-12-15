import { Injectable } from '@angular/core';
import { Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ProgressBarService} from "./progress-bar.service";
import {LoginResponse} from "../models/login-response";

@Injectable()
export class AuthService {


    private basicAuthHeader = 'Basic ' + btoa('webapp:123456');
    constructor(private http: HttpClient, private _progress: ProgressBarService) {}

    login(username: string, password: string): Observable<LoginResponse> {
        const headers = new HttpHeaders({
            'Authorization': this.basicAuthHeader,
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        const options = {headers: headers};
        return this.http.post<LoginResponse>('/oauth/token',
            'grant_type=password&scope=read%20write&username=' + username + '&password=' + password,
            options);
    }
}