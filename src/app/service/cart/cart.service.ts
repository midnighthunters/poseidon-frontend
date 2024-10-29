import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { CartItem } from '../../../swagger-codegen/models/cart-item';
import { AuthService } from '../auth/auth.service';
import { Product } from '../../../swagger-codegen/models/product';
import { Cart } from '../../../swagger-codegen/models';
import { CartControllerService } from '../../../swagger-codegen/services';
import { GetCartByUserId$Params } from '../../../swagger-codegen/fn/cart-controller/get-cart-by-user-id';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>(this.loadCartItems());
  items$ = this.itemsSubject.asObservable();

  private items: CartItem[] = this.loadCartItems();

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private authService: AuthService,private cartService:CartControllerService) {
    if (isPlatformBrowser(this.platformId)) {
      this.items$.subscribe(items => {
        localStorage.setItem('cartItems', JSON.stringify(items));
      });
    }
  }

  private loadCartItems(): CartItem[] {
    const loggedIn = this.authService.isLoggedIn()
    if(loggedIn){
      
    }else{
    if (isPlatformBrowser(this.platformId)) {
      const itemsJSON = localStorage.getItem('cartItems');
      return itemsJSON ? JSON.parse(itemsJSON) : [];
    }
  }
    return [];
  }

  private updateCartItems(items: CartItem[]): void {
    this.items = items;
    this.itemsSubject.next(this.items);
  }

  addToCart(product: CartItem): void {
    const existingIndex = this.items.findIndex(item => item.productId === product.productId);
    if (existingIndex !== -1) {
      const updatedItem = { ...this.items[existingIndex], quantity: this.items[existingIndex].quantity??0 + 1 };
      this.items.splice(existingIndex, 1, updatedItem);
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    this.updateCartItems(this.items);
  }
  
  removeFromCart(productId: string): void {
    const existingIndex = this.items.findIndex(item => item.productId === productId);
    if (existingIndex !== -1) {
      const updatedQuantity = this.items[existingIndex].quantity??0 - 1;
      if (updatedQuantity > 0) {
        const updatedItem = { ...this.items[existingIndex], quantity: updatedQuantity };
        this.items.splice(existingIndex, 1, updatedItem);
      } else {
        this.items.splice(existingIndex, 1);
      }
      this.updateCartItems(this.items);
    }
  }
  

  getItems(): CartItem[] {
    return this.items;
  }

  clearCart(): void {
    this.items = [];
    this.updateCartItems(this.items);
  }

  getTotalPrice(products: Product[], cartItems: CartItem[]): number {
    return products.reduce((total, product) => {
      const cartItem = cartItems.find(item => item.productId === product.id);
      if (cartItem) {
        const price = product.price ?? 0;
        const quantity = cartItem.quantity ?? 1;
        return total + (price * quantity);
      }
      return total;
    }, 0);
  }
  
  isInCart(productId: string): boolean {
    return this.items.some(item => item.productId === productId);
  }

  getUserCart(userId:string):Observable<Cart>{
    const params: GetCartByUserId$Params = {
      id:userId
    }
    return this.cartService.getCartByUserId(params);
  }
}
