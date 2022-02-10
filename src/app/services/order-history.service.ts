import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderHistory } from 'app/common/order-history';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderHistoryService {
  private orderUrl = 'https://sba-onlinestore.netlify.app/api/orders';

  constructor(private httpClient: HttpClient) {}

  getOrderHistory(myEmail: string): Observable<GetResponseOrderHistory> {
    const orderHistoryUrl = `${
      this.orderUrl
    }/search/findByCustomerEmail?email=${myEmail.toLowerCase()}`;
    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl);
  }
}

interface GetResponseOrderHistory {
  _embedded: {
    orders: OrderHistory[];
  };
}
