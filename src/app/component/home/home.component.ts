import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../swagger-codegen/models/product';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../service/product/product.service';
import { Router } from '@angular/router';
import { Item } from '../../models/carousel-item.model';
import { ItemService } from '../../service/carousel/item.service';
import { HttpClientModule } from '@angular/common/http';
import { CarouselItem } from '../../../swagger-codegen/models/carousel-item';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProductComponent,
    HttpClientModule,
    FormsModule,
    HeaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  items: Item[] = [];
  @Input() filteredProducts: Product[] = [];
  // carouselItems : CarouselItem[] = [];

  constructor(
    private router: Router,
    private itemService: ItemService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.items = this.itemService.getAllItems();
    // this.productService.getCarouselItems().subscribe(
    //   carouselItems => this.carouselItems = carouselItems,
    //   error => console.error('Error fetching carousel items:', error)
    // );
  }

  loadProducts(): void {
    this.products = this.productService.getAllProducts();
    this.filteredProducts = [...this.products];
  }

  onFilteredProductsChange(filteredProducts: Product[]): void {
    this.filteredProducts = filteredProducts;
  }

  redirectToProductDetails(productId: string | undefined): void {
    if (productId) {
      this.router.navigate(['/product', productId]);
    }
  }
}
