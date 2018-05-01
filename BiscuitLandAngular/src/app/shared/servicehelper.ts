import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

export class ServiceHelper {

  static httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  static API_URL = environment.apiUrl;

  constructor() {
  }

  static handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    if (error.status == "401") {
      window.location.href = "/login";
    }
    if (typeof error.error === "string") {
      return Observable.throw(error.error);
    } else {
      return Observable.throw(error.error.Message);
    }
  }
}
