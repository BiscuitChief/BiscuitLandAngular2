import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

import { ServiceHelper } from '../shared/servicehelper';

// tslint:disable-next-line:max-classes-per-file
@Injectable()
export class FileUploaderService {

  constructor(private http: HttpClient) { }

  public url: string = ServiceHelper.API_URL + 'api/recipes/uploadimage';

  uploadImage(fileToUpload: File): Observable<string> {
    let formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http
      .post(ServiceHelper.API_URL + 'api/recipes/uploadimage', formData, { headers: new HttpHeaders() })
      .map(rsp => (rsp as string[])[0])
      .catch(ServiceHelper.handleError);
  }

  deleteTempImage(fileToDelete: string): Observable<string> {
    return this.http
      .delete(ServiceHelper.API_URL + 'api/recipes/deletetempimage?imagename=' + fileToDelete, ServiceHelper.httpOptions)
      .map(rsp => "")
      .catch(ServiceHelper.handleError);
  }
}
