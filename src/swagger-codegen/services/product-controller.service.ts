/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { CarouselItem } from '../models/carousel-item';
import { getAllCategories } from '../fn/product-controller/get-all-categories';
import { GetAllCategories$Params } from '../fn/product-controller/get-all-categories';
import { getAllProduct } from '../fn/product-controller/get-all-product';
import { GetAllProduct$Params } from '../fn/product-controller/get-all-product';
import { getCarouselItems } from '../fn/product-controller/get-carousel-items';
import { GetCarouselItems$Params } from '../fn/product-controller/get-carousel-items';
import { getProductById } from '../fn/product-controller/get-product-by-id';
import { GetProductById$Params } from '../fn/product-controller/get-product-by-id';
import { getProductsByCategory } from '../fn/product-controller/get-products-by-category';
import { GetProductsByCategory$Params } from '../fn/product-controller/get-products-by-category';
import { Product } from '../models/product';
import { saveCarousel } from '../fn/product-controller/save-carousel';
import { SaveCarousel$Params } from '../fn/product-controller/save-carousel';
import { saveProduct } from '../fn/product-controller/save-product';
import { SaveProduct$Params } from '../fn/product-controller/save-product';


/**
 * ModifyProduct
 */
@Injectable({ providedIn: 'root' })
export class ProductControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `saveCarousel()` */
  static readonly SaveCarouselPath = '/product/carousel/add';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveCarousel()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveCarousel$Response(params: SaveCarousel$Params, context?: HttpContext): Observable<StrictHttpResponse<CarouselItem>> {
    return saveCarousel(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveCarousel$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveCarousel(params: SaveCarousel$Params, context?: HttpContext): Observable<CarouselItem> {
    return this.saveCarousel$Response(params, context).pipe(
      map((r: StrictHttpResponse<CarouselItem>): CarouselItem => r.body)
    );
  }

  /** Path part for operation `saveProduct()` */
  static readonly SaveProductPath = '/product/add';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveProduct()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveProduct$Response(params: SaveProduct$Params, context?: HttpContext): Observable<StrictHttpResponse<Product>> {
    return saveProduct(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveProduct$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveProduct(params: SaveProduct$Params, context?: HttpContext): Observable<Product> {
    return this.saveProduct$Response(params, context).pipe(
      map((r: StrictHttpResponse<Product>): Product => r.body)
    );
  }

  /** Path part for operation `getProductById()` */
  static readonly GetProductByIdPath = '/product/get';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProductById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductById$Response(params: GetProductById$Params, context?: HttpContext): Observable<StrictHttpResponse<Product>> {
    return getProductById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProductById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductById(params: GetProductById$Params, context?: HttpContext): Observable<Product> {
    return this.getProductById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Product>): Product => r.body)
    );
  }

  /** Path part for operation `getProductsByCategory()` */
  static readonly GetProductsByCategoryPath = '/product/category/{category}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProductsByCategory()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductsByCategory$Response(params: GetProductsByCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Product>>> {
    return getProductsByCategory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProductsByCategory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductsByCategory(params: GetProductsByCategory$Params, context?: HttpContext): Observable<Array<Product>> {
    return this.getProductsByCategory$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Product>>): Array<Product> => r.body)
    );
  }

  /** Path part for operation `getAllCategories()` */
  static readonly GetAllCategoriesPath = '/product/categories/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCategories()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCategories$Response(params?: GetAllCategories$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<'SPORTS_SHOES' | 'CASUAL_SHOES' | 'CLOGS' | 'SLIPPERS' | 'FORMAL_SHOES' | 'BOOTS' | 'ESPADRILLES'>>> {
    return getAllCategories(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCategories$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCategories(params?: GetAllCategories$Params, context?: HttpContext): Observable<Array<'SPORTS_SHOES' | 'CASUAL_SHOES' | 'CLOGS' | 'SLIPPERS' | 'FORMAL_SHOES' | 'BOOTS' | 'ESPADRILLES'>> {
    return this.getAllCategories$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<'SPORTS_SHOES' | 'CASUAL_SHOES' | 'CLOGS' | 'SLIPPERS' | 'FORMAL_SHOES' | 'BOOTS' | 'ESPADRILLES'>>): Array<'SPORTS_SHOES' | 'CASUAL_SHOES' | 'CLOGS' | 'SLIPPERS' | 'FORMAL_SHOES' | 'BOOTS' | 'ESPADRILLES'> => r.body)
    );
  }

  /** Path part for operation `getCarouselItems()` */
  static readonly GetCarouselItemsPath = '/product/carousel';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCarouselItems()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCarouselItems$Response(params?: GetCarouselItems$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CarouselItem>>> {
    return getCarouselItems(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCarouselItems$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCarouselItems(params?: GetCarouselItems$Params, context?: HttpContext): Observable<Array<CarouselItem>> {
    return this.getCarouselItems$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CarouselItem>>): Array<CarouselItem> => r.body)
    );
  }

  /** Path part for operation `getAllProduct()` */
  static readonly GetAllProductPath = '/product/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllProduct()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllProduct$Response(params?: GetAllProduct$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Product>>> {
    return getAllProduct(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllProduct$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllProduct(params?: GetAllProduct$Params, context?: HttpContext): Observable<Array<Product>> {
    return this.getAllProduct$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Product>>): Array<Product> => r.body)
    );
  }

}
