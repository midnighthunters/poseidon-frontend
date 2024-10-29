import { Component,Input } from '@angular/core';
import { Product } from '../../../swagger-codegen/models/product'; 
import { CartService } from '../../service/cart/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product!: Product;
  inCart = false;
  quantity = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {

    this.cartService.items$.subscribe(items => {
      this.inCart = items.some(item => item.productId === this.product.id);
      if (this.inCart) {
        const cartItem = items.find(item => item.productId === this.product.id);
        this.quantity = cartItem?.quantity ?? 0; 
      } else {
        this.quantity = 0; 
      }
    });
  }

  addToCart(event:Event): void {
    event.stopPropagation();
    this.cartService.addToCart({
      productId: this.product.id,
      quantity: 1
    });
  }

  removeFromCart(event:Event): void {
    event.stopPropagation();
    this.cartService.removeFromCart(this.product.id!);
  }

  getProductQuantity(): number {
    return this.quantity;
  }

}
