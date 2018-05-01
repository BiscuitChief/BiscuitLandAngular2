import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ServiceHelper } from '../shared/servicehelper';

@Injectable()
export class DatabaseScriptsService {

  constructor(private http: HttpClient) { }

  getSecurity(): Observable<any> {
    return this.http
      .get(ServiceHelper.API_URL + 'api/GetAllowedDownloads')
      .map(rsp => rsp as JSON)
      .catch(ServiceHelper.handleError);
  }

  createDataBackupScripts(): Observable<string> {
    return this.http
      .post(ServiceHelper.API_URL + 'api/CreateDataBackupScripts', null, ServiceHelper.httpOptions)
      .map(rsp => "Success")
      .catch(ServiceHelper.handleError);
  }
}
