/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Order } from '../../models/order';

export interface GetAllOrder$Params {
}

export function getAllOrder(http: HttpClient, rootUrl: string, params?: GetAllOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Order>>> {
  const rb = new RequestBuilder(rootUrl, getAllOrder.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Order>>;
    })
  );
}

getAllOrder.PATH = '/order/all';
