/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { checkout } from '../fn/checkout-controller/checkout';
import { Checkout$Params } from '../fn/checkout-controller/checkout';
import { Order } from '../models/order';


/**
 * Checkout
 */
@Injectable({ providedIn: 'root' })
export class CheckoutControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `checkout()` */
  static readonly CheckoutPath = '/checkout';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `checkout()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkout$Response(params: Checkout$Params, context?: HttpContext): Observable<StrictHttpResponse<Order>> {
    return checkout(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `checkout$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkout(params: Checkout$Params, context?: HttpContext): Observable<Order> {
    return this.checkout$Response(params, context).pipe(
      map((r: StrictHttpResponse<Order>): Order => r.body)
    );
  }

}
