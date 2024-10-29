import { Component, OnInit } from '@angular/core';
import { Product } from '../../../swagger-codegen/models/product'; 
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../service/product/product.service';
import { CartService } from '../../service/cart/cart.service';
import { CommonModule,Location } from '@angular/common';
import { AuthService } from '../../service/auth/auth.service';
import { QuantityControlComponent } from '../quantity-control/quantity-control.component';


@Component({
  selector: 'app-productdetail',
  standalone: true,
  imports:[CommonModule,QuantityControlComponent],
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {
  product!: Product;
  inCart = false;
  quantity = 0;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router:Router,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.params['id'];
    this.productService.getProductById(productId).subscribe(product => {
      this.product = product;
      console.log("product details", this.product);
    });
      this.inCart = this.cartService.isInCart(productId);
      if (this.inCart) {
        const cartItem = this.cartService.getItems().find(item => item.productId === productId);
        this.quantity = cartItem?.quantity ?? 0;
      }
  }

  addToCart(): void {
    this.cartService.addToCart({
      productId: this.product.id,
      quantity: 1
    });
    this.quantity++;
    this.inCart = true;
  }

  removeFromCart(): void {
    this.cartService.removeFromCart(this.product.id!);
    this.quantity--;
    if (this.quantity <= 0) {
      this.inCart = false;
    }
  }

  updateQuantity(newQuantity: number): void {
    this.quantity = newQuantity;
    if (this.quantity > 0) {
      this.cartService.addToCart({
        productId: this.product.id,
        quantity: this.quantity
      });
    } else {
      this.cartService.removeFromCart(this.product.id!);
    }
  }

  // increaseQuantity(): void {
  //   this.quantity++;
  //   this.cartService.addToCart({
  //     productId: this.product.id,
  //     quantity: 1
  //   });
  // }

  // decreaseQuantity(): void {
  //   if (this.quantity > 0) {
  //     this.quantity--;
  //     this.cartService.removeFromCart(this.product.id!);
  //     if (this.quantity <= 0) {
  //       this.inCart = false;
  //     }
  //   }
  // }

  navigateToCheckout(): void {
    console.log(this.product); 
      this.router.navigate(['/checkout'], { state: { product: this.product } });
  }

  goBack(): void {
    this.location.back();
  }

}
