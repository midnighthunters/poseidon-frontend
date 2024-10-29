import { Injectable } from '@angular/core';
import { ProductControllerService } from '../../../swagger-codegen/services/product-controller.service';
import { Product } from '../../../swagger-codegen/models/product';
import { Observable } from 'rxjs/internal/Observable';
import { CarouselItem } from '../../../swagger-codegen/models';
import { GetProductsByCategory$Params } from '../../../swagger-codegen/fn/product-controller/get-products-by-category';
import { GetProductById$Params } from '../../../swagger-codegen/fn/product-controller/get-product-by-id';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private productService:ProductControllerService) { 
  }

  products:Product[] = [];

  getAllProducts():Array<Product>{
    this.productService.getAllProduct().subscribe(products => {
      this.products = products;
    });
    console.log('products',this.products)
    return this.products;
  }

  getProductById(productId: string): Observable<Product> {
    const params: GetProductById$Params = {
      id: productId
    };
    return this.productService.getProductById(params);
  }

  getCarouselItems():Observable<CarouselItem[]>{
    return this.productService.getCarouselItems();
  }

  getCategoriesById(category:string):Observable<Product[]>{
    const params: GetProductsByCategory$Params = {
      category:category
    };
    return this.productService.getProductsByCategory(params);
  }

}



  // products: Product[] = [
  //   { id: 1, name: 'Product 1', imageUrl: 'https://img.freepik.com/free-photo/shoe-elegance-symbol-modern-computer-graphic-motion-nature-generated-by-ai_188544-19640.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1711152000&semt=ais' ,price:2 },
  //   { id: 2, name: 'Product 2', imageUrl: 'https://img.freepik.com/free-photo/shoe-elegance-symbol-modern-computer-graphic-motion-nature-generated-by-ai_188544-19640.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1711152000&semt=ais' ,price:2},
  //   { id: 3, name: 'Product 3', imageUrl: 'https://img.freepik.com/free-photo/shoe-elegance-symbol-modern-computer-graphic-motion-nature-generated-by-ai_188544-19640.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1711152000&semt=ais' ,price:2 },
  //   { id: 4, name: 'Product 4', imageUrl: 'https://img.freepik.com/free-photo/shoe-elegance-symbol-modern-computer-graphic-motion-nature-generated-by-ai_188544-19640.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1711152000&semt=ais' ,price:2},
  //   { id: 5, name: 'Product 5', imageUrl: 'https://img.freepik.com/free-photo/shoe-elegance-symbol-modern-computer-graphic-motion-nature-generated-by-ai_188544-19640.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1711152000&semt=ais' ,price:2},
  //   { id: 6, name: 'Product 6', imageUrl: 'https://img.freepik.com/free-photo/shoe-elegance-symbol-modern-computer-graphic-motion-nature-generated-by-ai_188544-19640.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1711152000&semt=ais' ,price:2},
  //   { id: 7, name: 'Product 7', imageUrl: 'https://img.freepik.com/free-photo/shoe-elegance-symbol-modern-computer-graphic-motion-nature-generated-by-ai_188544-19640.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1711152000&semt=ais' ,price:2},
  //   { id: 8, name: 'Product 8', imageUrl: 'https://img.freepik.com/free-photo/shoe-elegance-symbol-modern-computer-graphic-motion-nature-generated-by-ai_188544-19640.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1711152000&semt=ais' ,price:2},
  //   { id: 9, name: 'Product 9', imageUrl: 'https://img.freepik.com/free-photo/shoe-elegance-symbol-modern-computer-graphic-motion-nature-generated-by-ai_188544-19640.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1711152000&semt=ais' ,price:2},
  // ];


  // getAllProducts(): Product[] {
  //   return this.products;
  // }

  // getProductById(id: number): Product | undefined {
  //   return this.products.find(product => product.id === id);
  // }
