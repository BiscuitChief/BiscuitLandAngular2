import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

import { ServiceHelper } from '../shared/servicehelper';
import { LoginCredential } from '../shared/login-credential.type';

const API_URL = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  login(logininfo: LoginCredential): Observable<string> {
    return this.http
      .post(API_URL + 'api/login', logininfo, httpOptions)
      .map(rsp => rsp as string)
      .catch(ServiceHelper.handleError);
  }
}
