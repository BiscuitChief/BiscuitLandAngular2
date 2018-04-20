import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

import { ServiceHelper } from '../shared/servicehelper';
import { NavItem } from '../shared/navitem.type';

const API_URL = environment.apiUrl;

@Injectable()
export class NavitemService {

  constructor(private http: HttpClient) { }

  getNavItems(): Observable<NavItem[]> {
    return this.http
      .get(API_URL + 'api/gettopnavigation')
      .map(rsp => rsp as NavItem[])
      .catch(ServiceHelper.handleError);
  }
}
