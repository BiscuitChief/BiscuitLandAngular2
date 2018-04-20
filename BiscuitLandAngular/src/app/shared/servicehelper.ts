import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

export class ServiceHelper {

  constructor() {
  }

  static handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error.error);
  }
}
