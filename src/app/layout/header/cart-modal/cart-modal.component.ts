import { Component, Input } from '@angular/core';
import { CartItem } from '../../../models/cart-item.model';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css'],
  standalone: false
})
export class CartModalComponent {
  @Input() isCartOpen: boolean = false;
  cartItems: CartItem[] = [
    {
      id: 1,
      name: 'Air Max Plus TN 1 "Drácula" - 40',
      imageUrl: 'https://www.tnsdojota.com/wp-content/uploads/2024/10/586c6c4d-300x300.jpeg',
      quantity: 1,
      price: 309.00
    }
  
  ];

  get subtotal() {
    return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  removeItem(id: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
  }

  closeCart() {
    this.isCartOpen = false; 
  }
}