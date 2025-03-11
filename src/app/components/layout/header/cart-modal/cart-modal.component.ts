import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CartService, CartItem } from '../../../../services/cart/cart.service';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css'],
  standalone: false,
  animations: [
    trigger('modalAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class CartModalComponent implements OnInit, OnDestroy {
  @Input() isCartOpen: boolean = false;
  @Output() closeCart = new EventEmitter<void>();
  
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  private cartSubscription?: Subscription;
  private totalSubscription?: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Inscrever-se para receber atualizações do carrinho
    this.cartSubscription = this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
    
    // Inscrever-se para receber atualizações do total
    this.totalSubscription = this.cartService.cartTotal$.subscribe(total => {
      this.subtotal = total;
    });
  }

  ngOnDestroy(): void {
    // Limpar inscrições ao destruir o componente
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if (this.totalSubscription) {
      this.totalSubscription.unsubscribe();
    }
  }

  removeItem(id: number, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.removeItem(id);
  }

  updateQuantity(id: number, change: number): void {
    const item = this.cartItems.find(item => item.id === id);
    if (item) {
      const newQuantity = item.quantity + change;
      this.cartService.updateQuantity(id, newQuantity);
    }
  }

  close(): void {
    this.closeCart.emit();
  }

  clearCart(): void {
    if (confirm('Tem certeza que deseja esvaziar o carrinho?')) {
      this.cartService.clearCart();
    }
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}