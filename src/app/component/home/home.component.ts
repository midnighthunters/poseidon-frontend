import { Component, OnInit } from '@angular/core';
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


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,ProductComponent,HttpClientModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  products: Product[] = [];
  items: Item[] = [];
  carouselItems : CarouselItem[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = '';

  constructor(private router: Router,private itemService: ItemService,private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.items = this.itemService.getAllItems();
    this.productService.getCarouselItems().subscribe(
      carouselItems => this.carouselItems = carouselItems,
      error => console.error('Error fetching carousel items:', error)
    );
  }

  loadProducts(): void {
    this.products = this.productService.getAllProducts();
    this.filteredProducts = [...this.products];
  }

  redirectToProductDetails(productId: string | undefined): void {
    if (productId) {
    this.router.navigate(['/product', productId]);
    }
  }

  filterProducts(): void {
    if (!this.searchQuery.trim()) {
      // If search query is empty, show all products
      this.filteredProducts = [...this.products];
    } else {
      // Filter products based on search query
      this.filteredProducts = this.products.filter(product =>
        product.name?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  sortProducts(order: 'asc' | 'desc'): void {
    this.filteredProducts = this.filteredProducts.sort((a, b) => {
      const priceA = a?.price || 0; // Use 0 if price is undefined
      const priceB = b?.price || 0; // Use 0 if price is undefined
  
      if (order === 'asc') {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });
  }
  
}
