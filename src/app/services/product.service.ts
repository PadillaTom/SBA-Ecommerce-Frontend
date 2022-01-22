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

  getProductsListPaginate(
    thePage: number,
    thePageSize: number,
    categoryId: number
  ): Observable<GetResponseProducts> {
    const searchUrl =
      `${this.baseProductsUrl}/search/findByCategoryId?id=${categoryId}` +
      `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseCategories>(this.baseCategoriesUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }

  searchProducts(mySearch: string): Observable<Product[]> {
    const searchUrl = `${this.baseProductsUrl}/search/findByNameContaining?name=${mySearch}`;
    return this.httpClient
      .get<GetResponseProducts>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }

  getProductDetails(prodId: number): Observable<Product> {
    const searchUrl = `${this.baseProductsUrl}/${prodId}`;
    return this.httpClient.get<Product>(searchUrl);
  }
}

//  === Interfaces ===
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
interface GetResponseCategories {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
