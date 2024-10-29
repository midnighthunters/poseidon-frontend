/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface GetJwtData$Params {
  token: string;
}

export function getJwtData(http: HttpClient, rootUrl: string, params: GetJwtData$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: {
};
}>> {
  const rb = new RequestBuilder(rootUrl, getJwtData.PATH, 'get');
  if (params) {
    rb.query('token', params.token, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      [key: string]: {
      };
      }>;
    })
  );
}

getJwtData.PATH = '/get/jwt/data';
