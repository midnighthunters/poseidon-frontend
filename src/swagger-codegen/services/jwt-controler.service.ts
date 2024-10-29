/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createJws } from '../fn/jwt-controler/create-jws';
import { CreateJws$Params } from '../fn/jwt-controler/create-jws';
import { getJwtData } from '../fn/jwt-controler/get-jwt-data';
import { GetJwtData$Params } from '../fn/jwt-controler/get-jwt-data';
import { getJwtToken } from '../fn/jwt-controler/get-jwt-token';
import { GetJwtToken$Params } from '../fn/jwt-controler/get-jwt-token';
import { JwtResponse } from '../models/jwt-response';
import { validateToken } from '../fn/jwt-controler/validate-token';
import { ValidateToken$Params } from '../fn/jwt-controler/validate-token';
import { verifyJws } from '../fn/jwt-controler/verify-jws';
import { VerifyJws$Params } from '../fn/jwt-controler/verify-jws';


/**
 * JWT
 */
@Injectable({ providedIn: 'root' })
export class JwtControlerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `validateToken()` */
  static readonly ValidateTokenPath = '/validate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `validateToken()` instead.
   *
   * This method doesn't expect any request body.
   */
  validateToken$Response(params: ValidateToken$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return validateToken(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `validateToken$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  validateToken(params: ValidateToken$Params, context?: HttpContext): Observable<boolean> {
    return this.validateToken$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `getJwtToken()` */
  static readonly GetJwtTokenPath = '/get/jwt/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getJwtToken()` instead.
   *
   * This method doesn't expect any request body.
   */
  getJwtToken$Response(params: GetJwtToken$Params, context?: HttpContext): Observable<StrictHttpResponse<JwtResponse>> {
    return getJwtToken(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getJwtToken$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getJwtToken(params: GetJwtToken$Params, context?: HttpContext): Observable<JwtResponse> {
    return this.getJwtToken$Response(params, context).pipe(
      map((r: StrictHttpResponse<JwtResponse>): JwtResponse => r.body)
    );
  }

  /** Path part for operation `getJwtData()` */
  static readonly GetJwtDataPath = '/get/jwt/data';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getJwtData()` instead.
   *
   * This method doesn't expect any request body.
   */
  getJwtData$Response(params: GetJwtData$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: {
};
}>> {
    return getJwtData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getJwtData$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getJwtData(params: GetJwtData$Params, context?: HttpContext): Observable<{
[key: string]: {
};
}> {
    return this.getJwtData$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
[key: string]: {
};
}>): {
[key: string]: {
};
} => r.body)
    );
  }

  /** Path part for operation `verifyJws()` */
  static readonly VerifyJwsPath = '/get/jws/verify';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `verifyJws()` instead.
   *
   * This method doesn't expect any request body.
   */
  verifyJws$Response(params: VerifyJws$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return verifyJws(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `verifyJws$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  verifyJws(params: VerifyJws$Params, context?: HttpContext): Observable<string> {
    return this.verifyJws$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `createJws()` */
  static readonly CreateJwsPath = '/create/jws';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createJws()` instead.
   *
   * This method doesn't expect any request body.
   */
  createJws$Response(params: CreateJws$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return createJws(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createJws$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  createJws(params: CreateJws$Params, context?: HttpContext): Observable<string> {
    return this.createJws$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
