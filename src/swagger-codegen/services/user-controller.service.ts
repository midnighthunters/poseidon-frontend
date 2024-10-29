/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getAllUsers } from '../fn/user-controller/get-all-users';
import { GetAllUsers$Params } from '../fn/user-controller/get-all-users';
import { getUserById } from '../fn/user-controller/get-user-by-id';
import { GetUserById$Params } from '../fn/user-controller/get-user-by-id';
import { getUserByIdentity } from '../fn/user-controller/get-user-by-identity';
import { GetUserByIdentity$Params } from '../fn/user-controller/get-user-by-identity';
import { saveUser } from '../fn/user-controller/save-user';
import { SaveUser$Params } from '../fn/user-controller/save-user';
import { updateAddress } from '../fn/user-controller/update-address';
import { UpdateAddress$Params } from '../fn/user-controller/update-address';
import { User } from '../models/user';


/**
 * AddUser
 */
@Injectable({ providedIn: 'root' })
export class UserControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateAddress()` */
  static readonly UpdateAddressPath = '/user/update/{userId}/address';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAddress()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAddress$Response(params: UpdateAddress$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return updateAddress(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateAddress$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAddress(params: UpdateAddress$Params, context?: HttpContext): Observable<User> {
    return this.updateAddress$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `saveUser()` */
  static readonly SaveUserPath = '/user/add';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveUser$Response(params: SaveUser$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return saveUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveUser(params: SaveUser$Params, context?: HttpContext): Observable<User> {
    return this.saveUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `getUserById()` */
  static readonly GetUserByIdPath = '/user/get';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById$Response(params: GetUserById$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return getUserById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById(params: GetUserById$Params, context?: HttpContext): Observable<User> {
    return this.getUserById$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `getUserByIdentity()` */
  static readonly GetUserByIdentityPath = '/user/get/identity';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserByIdentity()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserByIdentity$Response(params: GetUserByIdentity$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return getUserByIdentity(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserByIdentity$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserByIdentity(params: GetUserByIdentity$Params, context?: HttpContext): Observable<User> {
    return this.getUserByIdentity$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `getAllUsers()` */
  static readonly GetAllUsersPath = '/user/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUsers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers$Response(params?: GetAllUsers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<User>>> {
    return getAllUsers(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllUsers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers(params?: GetAllUsers$Params, context?: HttpContext): Observable<Array<User>> {
    return this.getAllUsers$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<User>>): Array<User> => r.body)
    );
  }

}
