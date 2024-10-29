/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { VerifyIdentityRequest } from '../../models/verify-identity-request';
import { VerifyIdentityResponse } from '../../models/verify-identity-response';

export interface Authenticate$Params {
      body: VerifyIdentityRequest
}

export function authenticate(http: HttpClient, rootUrl: string, params: Authenticate$Params, context?: HttpContext): Observable<StrictHttpResponse<VerifyIdentityResponse>> {
  const rb = new RequestBuilder(rootUrl, authenticate.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<VerifyIdentityResponse>;
    })
  );
}

authenticate.PATH = '/auth/authenticate';
