import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

import { ServiceHelper } from '../shared/servicehelper';
import { LoginCredential } from '../shared/login-credential.type';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  login(logininfo: LoginCredential): Observable<string> {
    return this.http
      .post(ServiceHelper.API_URL + 'api/login', logininfo, ServiceHelper.httpOptions)
      .map(rsp => rsp as string)
      .catch(ServiceHelper.handleError);
  }

  logout(): Observable<string> {
    return this.http
      .post(ServiceHelper.API_URL + 'api/logout', null, ServiceHelper.httpOptions)
      .map(rsp => "")
      .catch(ServiceHelper.handleError);
  }
}
