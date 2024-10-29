// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart/cart.service';
import { CartItem } from '../../../swagger-codegen/models/cart-item'; 
import { CommonModule } from '@angular/common';
import { ProductCacheService } from '../../caching/ProduceCacheService';
import { Observable, map, catchError, throwError, forkJoin } from 'rxjs';
import { Cart, Product } from '../../../swagger-codegen/models';
import { QuantityControlComponent } from '../quantity-control/quantity-control.component';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,QuantityControlComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productsInCart: CartItem[] = [];
  address: string = '';
  phoneNumber: string = '';
  total: number = 0;
  products$!: Observable<Product[]>;
  commonProducts: Product[] = [];

  constructor(private cartService: CartService,private productService:ProductCacheService,private authService:AuthService) {}

  ngOnInit(): void {
    if(this.isAuthenticated){
      const userId = "koli1"; 
      const userCart$ = this.cartService.getUserCart(userId); 
      const currentCart$ = this.cartService.getItems(); 
  
      forkJoin([userCart$, currentCart$]).subscribe(([userCart, currentCart]) => {
          const mergedCart = this.mergeCarts(userCart, Array.isArray(currentCart) ? currentCart : [currentCart]);
          this.productsInCart = mergedCart;
      });
    }else{
        this.productsInCart = this.cartService.getItems();
    }
    this.products$ = this.productService.getProducts();
    this.products$.subscribe(products => {
      this.commonProducts = products.filter(product =>
        this.productsInCart.some(cartProduct => cartProduct.productId === product.id)
      );
      this.total = this.cartService.getTotalPrice(this.commonProducts,this.productsInCart);
    });
  }

  get isAuthenticated(): boolean {
    return this.authService.isLoggedIn();
  }

  getProductImageUrl(productId: string | undefined) {
    return this.productService.getProductById(productId??'o').pipe(
      map(product => product.imageUrl || 'default-image.jpg'), 
      catchError(error => {
        console.error('Error fetching product image:', error);
        return throwError('Product image URL not found'); 
      })
    );
  }

  updateQuantity(cartItem: CartItem, newQuantity: number): void {
    if (newQuantity > 0) {
      cartItem.quantity = newQuantity;
      this.cartService.addToCart({
        productId: cartItem.productId,
        quantity: cartItem.quantity
      });
    } else {
      this.cartService.removeFromCart(cartItem.productId!);
    }
  }

  mergeCarts(userCart: Cart, currentCart: CartItem[]): CartItem[] {
    const mergedCart = [...currentCart];
    if (userCart.products) {
        for (const userCartItem of userCart.products) {
            const existingItemIndex = mergedCart.findIndex(item => item.productId === userCartItem.productId);
            if (existingItemIndex !== -1 && userCartItem.quantity) {
                mergedCart[existingItemIndex].quantity =  mergedCart[existingItemIndex].quantity ?? 0 + userCartItem.quantity ?? 0;
            } else {
                mergedCart.push(userCartItem);
            }
        }
    }
    return mergedCart;
}

}

