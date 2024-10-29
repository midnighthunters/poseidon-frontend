import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from '../../swagger-codegen/models/product'; // Update the path according to your project structure
import { ProductService } from '../../app/service/product/product.service'; // Update the path according to your project structure
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductCacheService {
  private productsCache: Product[] = [];
  private cacheTimestamp: number = 0;
  private cacheDuration: number = 30 * 60 * 1000; 
  private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private productService: ProductService) { }

  getProducts(): Observable<Product[]> {
    if (Date.now() - this.cacheTimestamp > this.cacheDuration || this.productsCache.length === 0) {
      const products = this.productService.getAllProducts();
      this.productsCache = products;    
      this.cacheTimestamp = Date.now();
      this.productsSubject.next(products);
    }
    return this.productsSubject.asObservable();
  }

  getProductById(productId: string): Observable<Product> {
    return this.getProducts().pipe(
      map(products => products.find(product => product.id === productId)),
      map(product => {
        if (product) {
          return product; 
        } else {
          throw new Error('Product not found'); 
        }
      })
    );
  }
}
