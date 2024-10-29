/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Cart } from '../models/cart';
import { getAllCarts } from '../fn/cart-controller/get-all-carts';
import { GetAllCarts$Params } from '../fn/cart-controller/get-all-carts';
import { getCartById } from '../fn/cart-controller/get-cart-by-id';
import { GetCartById$Params } from '../fn/cart-controller/get-cart-by-id';
import { getCartByUserId } from '../fn/cart-controller/get-cart-by-user-id';
import { GetCartByUserId$Params } from '../fn/cart-controller/get-cart-by-user-id';
import { saveCart } from '../fn/cart-controller/save-cart';
import { SaveCart$Params } from '../fn/cart-controller/save-cart';


/**
 * ModifyCart
 */
@Injectable({ providedIn: 'root' })
export class CartControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `saveCart()` */
  static readonly SaveCartPath = '/cart/add';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveCart()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveCart$Response(params: SaveCart$Params, context?: HttpContext): Observable<StrictHttpResponse<Cart>> {
    return saveCart(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveCart$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveCart(params: SaveCart$Params, context?: HttpContext): Observable<Cart> {
    return this.saveCart$Response(params, context).pipe(
      map((r: StrictHttpResponse<Cart>): Cart => r.body)
    );
  }

  /** Path part for operation `getCartById()` */
  static readonly GetCartByIdPath = '/cart/get';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCartById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCartById$Response(params: GetCartById$Params, context?: HttpContext): Observable<StrictHttpResponse<Cart>> {
    return getCartById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCartById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCartById(params: GetCartById$Params, context?: HttpContext): Observable<Cart> {
    return this.getCartById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Cart>): Cart => r.body)
    );
  }

  /** Path part for operation `getCartByUserId()` */
  static readonly GetCartByUserIdPath = '/cart/get/userId';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCartByUserId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCartByUserId$Response(params: GetCartByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Cart>> {
    return getCartByUserId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCartByUserId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCartByUserId(params: GetCartByUserId$Params, context?: HttpContext): Observable<Cart> {
    return this.getCartByUserId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Cart>): Cart => r.body)
    );
  }

  /** Path part for operation `getAllCarts()` */
  static readonly GetAllCartsPath = '/cart/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCarts()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCarts$Response(params?: GetAllCarts$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Cart>>> {
    return getAllCarts(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCarts$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCarts(params?: GetAllCarts$Params, context?: HttpContext): Observable<Array<Cart>> {
    return this.getAllCarts$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Cart>>): Array<Cart> => r.body)
    );
  }

}
