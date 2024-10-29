import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Product } from '../../../swagger-codegen/models/product';
import { CartService } from '../../service/cart/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../../swagger-codegen/models/cart-item';
import { AuthService } from '../../service/auth/auth.service';
import { ProductCacheService } from '../../caching/ProduceCacheService';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { CartComponent } from '../cart/cart.component';
import { Router } from '@angular/router';
import { Address } from '../../../swagger-codegen/models';

declare var Razorpay: any;

@Component({
  selector: 'app-checkout',
  imports: [FormsModule, CommonModule,CartComponent],
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  productsInCart: CartItem[] = [];
  address: string = '';
  phoneNumber: string = '';
  total: number = 0;
  products$!: Observable<Product[]>;
  commonProducts: Product[] = [];
  showAddressOptions:boolean = true;
  showAddressForm: boolean = false;
  newAddress: string = '';
  isAuthenticated: boolean = false;

  constructor(private location: Location,private router:Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  toggleAddressForm(): void {
    this.showAddressForm = !this.showAddressForm;
  }

  // get isAuthenticated(): boolean {
  //   return this.authService.isLoggedIn();
  // }

  fetchExistingAddress():void{
    this.authService.fetchAddress().subscribe(result => {
      this.address = JSON.stringify(result.shippingAddresses);
    });
  }

  saveNewAddress(){
    this.address = this.newAddress;
    // this.authService.saveAddress(this.address);
    console.log("address",this.address)
  }

  proceedToLogin():void{
      this.router.navigate(['/auth']);
    }

  proceedToPayment(): void {
    const options = {
      key: 'rzp_test_hvKHA49YunTUpT', 
      amount: 100,
      currency: 'INR',
      name: 'Koli', 
      description: 'Product/Service Purchase',
      // order_id: '234', 
      handler: this.paymentSuccessHandler.bind(this),
      prefill: {
        name: 'Customer Name', 
        email: 'customer@example.com', 
        contact: '9876543210' 
      }
    };

    const razorpay = new Razorpay(options);
    razorpay.open();
  }

  paymentSuccessHandler(response: any) {
    console.log('Payment Successful:', response);
  }
  
  paymentErrorHandler(error: any) {
    console.error('Payment Error:', error);
  }

  goBack(): void {
    this.location.back();
  }
}
