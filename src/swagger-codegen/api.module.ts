/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { UserControllerService } from './services/user-controller.service';
import { ProductControllerService } from './services/product-controller.service';
import { PaymentControllerService } from './services/payment-controller.service';
import { OrderControllerService } from './services/order-controller.service';
import { CartControllerService } from './services/cart-controller.service';
import { AuthControllerService } from './services/auth-controller.service';
import { JwtControlerService } from './services/jwt-controler.service';
import { CheckoutControllerService } from './services/checkout-controller.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    UserControllerService,
    ProductControllerService,
    PaymentControllerService,
    OrderControllerService,
    CartControllerService,
    AuthControllerService,
    JwtControlerService,
    CheckoutControllerService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
