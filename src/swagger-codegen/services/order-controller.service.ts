/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getAllOrder } from '../fn/order-controller/get-all-order';
import { GetAllOrder$Params } from '../fn/order-controller/get-all-order';
import { getOrderById } from '../fn/order-controller/get-order-by-id';
import { GetOrderById$Params } from '../fn/order-controller/get-order-by-id';
import { Order } from '../models/order';
import { saveOrder } from '../fn/order-controller/save-order';
import { SaveOrder$Params } from '../fn/order-controller/save-order';


/**
 * ModifyOrder
 */
@Injectable({ providedIn: 'root' })
export class OrderControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `saveOrder()` */
  static readonly SaveOrderPath = '/order/add';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveOrder()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveOrder$Response(params: SaveOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<Order>> {
    return saveOrder(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveOrder$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveOrder(params: SaveOrder$Params, context?: HttpContext): Observable<Order> {
    return this.saveOrder$Response(params, context).pipe(
      map((r: StrictHttpResponse<Order>): Order => r.body)
    );
  }

  /** Path part for operation `getOrderById()` */
  static readonly GetOrderByIdPath = '/order/get';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOrderById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrderById$Response(params: GetOrderById$Params, context?: HttpContext): Observable<StrictHttpResponse<Order>> {
    return getOrderById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOrderById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrderById(params: GetOrderById$Params, context?: HttpContext): Observable<Order> {
    return this.getOrderById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Order>): Order => r.body)
    );
  }

  /** Path part for operation `getAllOrder()` */
  static readonly GetAllOrderPath = '/order/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllOrder()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllOrder$Response(params?: GetAllOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Order>>> {
    return getAllOrder(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllOrder$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllOrder(params?: GetAllOrder$Params, context?: HttpContext): Observable<Array<Order>> {
    return this.getAllOrder$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Order>>): Array<Order> => r.body)
    );
  }

}
