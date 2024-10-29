/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { capturePayment } from '../fn/payment-controller/capture-payment';
import { CapturePayment$Params } from '../fn/payment-controller/capture-payment';
import { createOrder } from '../fn/payment-controller/create-order';
import { CreateOrder$Params } from '../fn/payment-controller/create-order';


/**
 * Payment
 */
@Injectable({ providedIn: 'root' })
export class PaymentControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createOrder()` */
  static readonly CreateOrderPath = '/payment/create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createOrder()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createOrder$Response(params: CreateOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return createOrder(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createOrder$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createOrder(params: CreateOrder$Params, context?: HttpContext): Observable<{
}> {
    return this.createOrder$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `capturePayment()` */
  static readonly CapturePaymentPath = '/payment/capture';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `capturePayment()` instead.
   *
   * This method doesn't expect any request body.
   */
  capturePayment$Response(params: CapturePayment$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return capturePayment(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `capturePayment$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  capturePayment(params: CapturePayment$Params, context?: HttpContext): Observable<{
}> {
    return this.capturePayment$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

}
