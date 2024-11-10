import { Component, OnInit } from '@angular/core';
import { Product } from '../../../swagger-codegen/models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../service/product/product.service';
import { CartService } from '../../service/cart/cart.service';
import { CommonModule, Location } from '@angular/common';
import { AuthService } from '../../service/auth/auth.service';
import { QuantityControlComponent } from '../quantity-control/quantity-control.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productdetail',
  standalone: true,
  imports: [CommonModule, QuantityControlComponent, FormsModule],
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':leave', [animate('0.5s', style({ opacity: 0 }))]),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class ProductdetailComponent implements OnInit {
  product!: Product;
  inCart = false;
  quantity = 0;
  largeImage: string = 'assets/001.jpeg';
  smallImages: string[] = [];
  shoeSizes: string[] = ['6', '7', '8', '9', '10', '11', '12'];
  selectedSize: string | null = null;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.params['id'];
    this.productService.getProductById(productId).subscribe((product) => {
      this.product = product;
      this.largeImage = product.imageUrl!; // Set the main image from product.imageUrl
      this.smallImages = [product.imageUrl!, product.imageUrl!];
      // this.smallImages = product.additionalImages || [];
      console.log('product details', this.product);
    });
    this.inCart = this.cartService.isInCart(productId);
    if (this.inCart) {
      const cartItem = this.cartService
        .getItems()
        .find((item) => item.productId === productId);
      this.quantity = cartItem?.quantity ?? 0;
    }
  }

  // largeImage: string = 'assets/001.jpeg';
  // smallImages: string[] = [
  //   'assets/001.jpeg',
  //   'assets/002.jpeg',
  //   'assets/003.jpeg',
  //   'assets/004.jpeg',
  // ];

  // Change large image on click
  changeLargeImage(image: string) {
    this.largeImage = image;
    // this.largeImage = image.replace('small', 'large'); // assuming large images follow this naming pattern
  }

  addToCart(event: Event): void {
    if (!this.selectedSize) {
      alert('Please select a shoe size before proceeding to checkout.');
      return;
    }
    event.stopPropagation();
    this.cartService.addToCart({
      productId: this.product.id,
      quantity: this.product.quantity ?? 0 + 1,
    });
    this.inCart = true;
  }

  removeFromCart(event: Event): void {
    event.stopPropagation();
    this.cartService.removeFromCart(this.product.id!);
    if (this.quantity <= 0) {
      this.inCart = false;
    }
  }

  // addToCart(): void {
  //   this.cartService.addToCart({
  //     productId: this.product.id,
  //     quantity: 1,
  //   });
  //   this.quantity++;
  //   this.inCart = true;
  // }

  // removeFromCart(): void {
  //   this.cartService.removeFromCart(this.product.id!);
  //   this.quantity--;
  //   if (this.quantity <= 0) {
  //     this.inCart = false;
  //   }
  // }

  // updateQuantity(newQuantity: number): void {
  //   this.quantity = newQuantity;
  //   if (this.quantity > 0) {
  //     this.cartService.addToCart({
  //       productId: this.product.id,
  //       quantity: this.quantity,
  //     });
  //   } else {
  //     this.cartService.removeFromCart(this.product.id!);
  //   }
  // }

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
