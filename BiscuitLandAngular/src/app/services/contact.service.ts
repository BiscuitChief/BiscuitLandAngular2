import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ServiceHelper } from '../shared/servicehelper';
import { ContactMessage } from '../shared/contact-message.type';

@Injectable()
export class ContactService {

  constructor(private http: HttpClient) { }

  SendMessage(message: ContactMessage): Observable<string> {
    return this.http
      .post(ServiceHelper.API_URL + 'api/contact', message, ServiceHelper.httpOptions)
      .map(rsp => rsp as string)
      .catch(ServiceHelper.handleError);
  }
}
