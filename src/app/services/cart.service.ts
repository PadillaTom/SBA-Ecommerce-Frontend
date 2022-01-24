import { Injectable } from '@angular/core';
import { CartItem } from 'app/common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  addToCart(myCartItem: CartItem) {
    // Already in cart?
    let alreadyInCart: boolean = false;
    let foundCartItem: CartItem = undefined!;

    if (this.cartItems.length > 0) {
      foundCartItem = this.cartItems.find(
        (tempItem) => tempItem.id === myCartItem.id
      )!;

      alreadyInCart = foundCartItem != undefined;
    }
    if (alreadyInCart) {
      // Increment QTY for existing Item:
      foundCartItem.quantity++;
    } else {
      // Add to Cart:
      this.cartItems.push(myCartItem);
    }
    // TOTALS:
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let cartItem of this.cartItems) {
      totalPriceValue += cartItem.quantity * cartItem.unitPrice;
      totalQuantityValue += cartItem.quantity;
    }

    // Send DATA to Subscribers:
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
}
