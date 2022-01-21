import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs';
import { ProductCategory } from 'app/common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseProductsUrlLocal = 'http://localhost:8080/api/products';
  private baseCategoriesUrlLocal = 'http://localhost:8080/api/product-category';

  private baseProductsUrl = 'https://sba-ecommerce.herokuapp.com/api/products';
  private baseCategoriesUrl =
    'https://sba-ecommerce.herokuapp.com/api/product-category';

  constructor(private httpClient: HttpClient) {}

  getProductsList(categoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseProductsUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.httpClient
      .get<GetResponseProducts>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }

  getCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseCategories>(this.baseCategoriesUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }
}

//  === Interfaces ===
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
}
interface GetResponseCategories {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
