import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseApiUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) {}

  getProductsList(categoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseApiUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.httpClient
      .get<GetResponse>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }
}

//  Interface:
interface GetResponse {
  _embedded: {
    products: Product[];
  };
}
