/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Cart } from '../../models/cart';
import { CartItem } from '../../models/cart-item';

export interface SaveCart$Params {
  userId: string;
      body: CartItem
}

export function saveCart(http: HttpClient, rootUrl: string, params: SaveCart$Params, context?: HttpContext): Observable<StrictHttpResponse<Cart>> {
  const rb = new RequestBuilder(rootUrl, saveCart.PATH, 'post');
  if (params) {
    rb.query('userId', params.userId, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Cart>;
    })
  );
}

saveCart.PATH = '/cart/add';
