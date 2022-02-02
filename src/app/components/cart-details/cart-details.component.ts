import { Component, OnInit } from '@angular/core';
import { CartItem } from 'app/common/cart-item';
import { CartService } from 'app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css'],
})
export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQty: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {
    this.cartItems = this.cartService.cartItems;
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));
    this.cartService.totalQuantity.subscribe((data) => (this.totalQty = data));
    this.cartService.computeCartTotals();
  }

  incrementQty(myCartItem: CartItem) {
    this.cartService.addToCart(myCartItem);
  }

  decreaseQty(myCartItem: CartItem) {
    this.cartService.decreaseQuantity(myCartItem);
  }

  removeFromCart(myCartItem: CartItem) {
    this.cartService.removeFromCart(myCartItem);
  }
}
