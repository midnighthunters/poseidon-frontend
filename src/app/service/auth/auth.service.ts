import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { AuthControllerService, JwtControlerService, UserControllerService } from '../../../swagger-codegen/services';
import { PhoneIdentity } from '../../../swagger-codegen/models/phone-identity';
import { VerifyIdentityRequest } from '../../../swagger-codegen/models/verify-identity-request';
import { Observable, BehaviorSubject } from 'rxjs';
import { ValidateToken$Params } from '../../../swagger-codegen/fn/jwt-controler/validate-token';
import { Login$Params } from '../../../swagger-codegen/fn/auth-controller/login';
import { Authenticate$Params } from '../../../swagger-codegen/fn/auth-controller/authenticate';
import { Address, SendTokenResponse, User, VerifyIdentityResponse } from '../../../swagger-codegen/models';
import { isPlatformBrowser } from '@angular/common';
import { GetUserById$Params } from '../../../swagger-codegen/fn/user-controller/get-user-by-id';
import { GetJwtData$Params } from '../../../swagger-codegen/fn/jwt-controler/get-jwt-data';
import { GetUserByIdentity$Params } from '../../../swagger-codegen/fn/user-controller/get-user-by-identity';
import { UpdateAddress$Params } from '../../../swagger-codegen/fn/user-controller/update-address';
import { map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  errorMessage: string = '';
  uuid: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private authService: AuthControllerService, private jwtService: JwtControlerService, private userService: UserControllerService) {
      
  }

  private readonly AUTH_TOKEN_KEY = 'auth_token';

  setAuthToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.AUTH_TOKEN_KEY, token);
      this.isAuthenticatedSubject.next(true);
    }
  }

  getAuthToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.AUTH_TOKEN_KEY);
    }
    return null;
  }

  clearAuthToken() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.AUTH_TOKEN_KEY);
      this.isAuthenticatedSubject.next(false);
    }
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  sendOTP(phoneIdentity: PhoneIdentity): Observable<SendTokenResponse> {
    const loginParams: Login$Params = {
      body: phoneIdentity
    };
    return this.authService.login(loginParams);
  }

  verifyOTP(verifyRequest: VerifyIdentityRequest): Observable<VerifyIdentityResponse> {
    const verifyParams: Authenticate$Params = {
      body: verifyRequest
    }
    return this.authService.authenticate(verifyParams);
  }

  getUserId(): Observable<string> {
    const identityToken = this.getAuthToken();
    const Tokenparams: GetJwtData$Params = {
      token: identityToken ?? ''
    };

    return this.jwtService.getJwtData(Tokenparams).pipe(
      map(data => {
        if (data && typeof data['uniqueUserId'] === 'string') {
          return data['uniqueUserId'];
        } else {
          throw new Error('User ID not found in JWT data');
        }
      })
    );
  }

  fetchAddress(): Observable<User> {
    return this.getUserId().pipe(
      switchMap(userId => {
        const params: GetUserByIdentity$Params = {
          phone: userId.replace("+", "%2b")
        };
        return this.userService.getUserByIdentity(params);
      })
    );
  }

  saveAddress(address: Address) {
    this.getUserId().subscribe(userId => {
      const params: UpdateAddress$Params = {
        userId: userId,
        body: address
      };
      this.userService.updateAddress(params);
    });
  }

  public isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.getAuthToken();
      return token !== null && !this.isTokenExpired(token);
    }
    return false;
  }

  private isTokenExpired(token: string): Observable<boolean> {
    const params: ValidateToken$Params = {
      token: token
    };
    return this.jwtService.validateToken(params);
  }

}
