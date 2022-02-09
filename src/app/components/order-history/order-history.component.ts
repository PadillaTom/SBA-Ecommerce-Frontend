import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'app/common/order-history';
import { OrderHistoryService } from 'app/services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  orderHistoryList: OrderHistory[] = [];
  storage: Storage = sessionStorage;

  constructor(private orderHistoryservice: OrderHistoryService) {}

  ngOnInit(): void {
    this.handleOrderHistory();
  }

  handleOrderHistory() {
    const myEmail = JSON.parse(this.storage.getItem('userEmail'));
    this.orderHistoryservice.getOrderHistory(myEmail).subscribe((data) => {
      this.orderHistoryList = data._embedded.orders;
    });
  }
}
