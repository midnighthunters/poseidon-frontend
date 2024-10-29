import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../service/product/product.service';
import { Product } from '../../../swagger-codegen/models/product';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule,ProductComponent,HttpClientModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{
  products: Product[] = [];

  constructor(private router: Router,private route: ActivatedRoute,private productService: ProductService) { }


  ngOnInit(): void {
    this.loadProducts();
}


loadProducts(): void {
  const categoryId = this.route.snapshot.queryParams['categoryId'];
  console.log('category',categoryId);
  this.productService.getCategoriesById(categoryId).subscribe(
    (category) => {
      this.products = category;
      console.log('Fetched category:', category);
    },
    (error) => {
      console.error('Error fetching category:', error);
    }
  );
}

redirectToProductDetails(productId: string | undefined): void {
  if (productId) {
  this.router.navigate(['/product', productId]);
  }
}

}