import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderHistory } from 'app/common/order-history';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderHistoryService {
  private orderUrl = 'https://sba-ecommerce.herokuapp.com/api/orders';
  private orderUrlLocal = 'http://localhost:8080/api/orders';

  constructor(private httpClient: HttpClient) {}

  getOrderHistory(myEmail: string): Observable<GetResponseOrderHistory> {
    const orderHistoryUrl = `${this.orderUrlLocal}/search/findByCustomerEmail?email=${myEmail}`;
    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl);
  }
}

interface GetResponseOrderHistory {
  _embedded: {
    orders: OrderHistory[];
  };
}
