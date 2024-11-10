import { Component, EventEmitter, Output } from '@angular/core';
import { CartService } from '../../service/cart/cart.service';
import { CartItem } from '../../../swagger-codegen/models/cart-item';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../service/product/product.service';
import { Categories } from '../../enum/categories.enum';
import { CarouselItem } from '../../../swagger-codegen/models/carousel-item';
import { CartComponent } from '../cart/cart.component';
import { AuthService } from '../../service/auth/auth.service';
import { Product } from '../../../swagger-codegen/models/product';
import { ProductComponent } from '../product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    CartComponent,
    ProductComponent,
    HttpClientModule,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() filteredProductsChange = new EventEmitter<Product[]>();
  itemsCount: number = 0;
  items: CartItem[] = [];
  categories: string[] = Object.keys(Categories).map(
    (key) => Categories[key as keyof typeof Categories]
  );
  isNavbarOpen = false;
  isCategoriesDropdownOpen = false;
  isCartDropdownOpen = false;
  searchQuery: string = '';
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService,
    private productService: ProductService
  ) {
    this.items = this.cartService.getItems();
    this.cartService.items$.subscribe((items) => {
      this.itemsCount = items.length;
    });
    this.products = this.productService.getAllProducts();
    this.filteredProducts = [...this.products];
  }

  get isAuthenticated(): boolean {
    return this.authService.isLoggedIn();
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  toggleCategoriesDropdown() {
    this.isCategoriesDropdownOpen = !this.isCategoriesDropdownOpen;
  }

  toggleCartDropdown() {
    this.isCartDropdownOpen = !this.isCartDropdownOpen;
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToAuthPage() {
    const currentUrl = this.router.url;
    this.router.navigate(['/auth'], { queryParams: { returnUrl: currentUrl } });
  }

  navigateToCategoriesPage(categoryId: string): void {
    console.log('caeogry', categoryId);
    this.router.navigate(['/categories'], {
      queryParams: { categoryId: categoryId },
    });
  }

  filterProducts(): void {
    console.log('Filtering products...');
    if (!this.searchQuery.trim()) {
      this.filteredProducts = [...this.products]; // Show all products
    } else {
      this.filteredProducts = this.products.filter((product) =>
        product.name?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    this.filteredProductsChange.emit(this.filteredProducts); // Emit filtered products
    console.log(this.filteredProducts);
  }

  sortProducts(order: 'asc' | 'desc'): void {
    console.log('Sorting products...');
    this.filteredProducts = this.filteredProducts.sort((a, b) => {
      const priceA = a?.price || 0;
      const priceB = b?.price || 0;
      return order === 'asc' ? priceA - priceB : priceB - priceA;
    });
    this.filteredProductsChange.emit(this.filteredProducts);
    console.log(this.filteredProducts);
  }
}
