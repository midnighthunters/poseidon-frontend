/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { JwtResponse } from '../../models/jwt-response';

export interface GetJwtToken$Params {
  userId: string;
  validityInMillis: number;
}

export function getJwtToken(http: HttpClient, rootUrl: string, params: GetJwtToken$Params, context?: HttpContext): Observable<StrictHttpResponse<JwtResponse>> {
  const rb = new RequestBuilder(rootUrl, getJwtToken.PATH, 'get');
  if (params) {
    rb.path('userId', params.userId, {});
    rb.query('validityInMillis', params.validityInMillis, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<JwtResponse>;
    })
  );
}

getJwtToken.PATH = '/get/jwt/{userId}';
