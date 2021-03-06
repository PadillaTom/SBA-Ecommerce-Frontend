import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from 'app/common/purchase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private purchaseUrl =
    'https://sba-ecommerce.herokuapp.com/api/checkout/purchase';

  constructor(private httpClient: HttpClient) {}

  // POST to API
  placeOrder(purchase: Purchase): Observable<any> {
    console.log(purchase);
    console.log(this.purchaseUrl);

    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);
  }
}
