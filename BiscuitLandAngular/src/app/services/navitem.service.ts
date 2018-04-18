import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { NavItem } from '../shared/navitem.type';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable()
export class NavitemService {

  constructor(private restangular: Restangular,
    private processHTTPMsg: ProcessHTTPMsgService) { }

  getNavItems(): Observable<NavItem[]> {
    return this.restangular.all('api/gettopnavigation').getList();
  }

}
