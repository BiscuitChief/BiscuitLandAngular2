import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ServiceHelper } from '../shared/servicehelper';
import { NavItem } from '../shared/navitem.type';


@Injectable()
export class NavitemService {

  public topNavigation: BehaviorSubject<NavItem[]> = new BehaviorSubject<NavItem[]>([]);  //setup the top navigation this way because it'll be updated from multiple components

  constructor(private http: HttpClient) {
    this.refreshTopNavigation();
  }

  refreshTopNavigation() {
    this.http
      .get(ServiceHelper.API_URL + 'api/gettopnavigation')
      .subscribe(res => this.topNavigation.next(res as NavItem[])); //still need to figure out how to properly throw errors here
  }

  //testNavItems(): Observable<NavItem[]> {
  //  return this.http
  //    .get(API_URL + 'api/gettopnavigation')
  //    .map(rsp => this.topNavigation.next(rsp as NavItem[]))
  //    .catch(ServiceHelper.handleError);
  //}
}
