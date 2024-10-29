/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { User } from '../../models/user';

export interface GetUserByIdentity$Params {
  phone: string;
}

export function getUserByIdentity(http: HttpClient, rootUrl: string, params: GetUserByIdentity$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
  const rb = new RequestBuilder(rootUrl, getUserByIdentity.PATH, 'get');
  if (params) {
    rb.query('phone', params.phone, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<User>;
    })
  );
}

getUserByIdentity.PATH = '/user/get/identity';
