/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PhoneIdentity } from '../../models/phone-identity';
import { SendTokenResponse } from '../../models/send-token-response';

export interface Login$Params {
      body: PhoneIdentity
}

export function login(http: HttpClient, rootUrl: string, params: Login$Params, context?: HttpContext): Observable<StrictHttpResponse<SendTokenResponse>> {
  const rb = new RequestBuilder(rootUrl, login.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<SendTokenResponse>;
    })
  );
}

login.PATH = '/auth/login';
