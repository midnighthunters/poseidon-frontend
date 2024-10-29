import { Component } from '@angular/core';
import { CartService } from '../../service/cart/cart.service';
import { CartItem } from '../../../swagger-codegen/models/cart-item';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../service/product/product.service';
import { Categories } from '../../enum/categories.enum';
import { CarouselItem } from '../../../swagger-codegen/models/carousel-item';
import { CartComponent } from '../cart/cart.component';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,CartComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  itemsCount: number = 0; 
  items: CartItem[] = [];
  categories: string[] = Object.keys(Categories).map(key => Categories[key as keyof typeof Categories]);
  isNavbarOpen = false;
  isCategoriesDropdownOpen = false;
  isCartDropdownOpen = false;

  constructor( private router: Router,private cartService: CartService,private authService:AuthService
    ) {
    this.items = this.cartService.getItems();
    this.cartService.items$.subscribe(items => {
      this.itemsCount = items.length;
    });
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

  navigateToHome(){
    this.router.navigate(['/home']) 
  }

  navigateToAuthPage() {
    const currentUrl = this.router.url;
    this.router.navigate(['/auth'], { queryParams: { returnUrl: currentUrl } });
  }

  navigateToCategoriesPage(categoryId: string): void {
    console.log('caeogry',categoryId);
    this.router.navigate(['/categories'], { queryParams: { categoryId: categoryId } });
  }

}
