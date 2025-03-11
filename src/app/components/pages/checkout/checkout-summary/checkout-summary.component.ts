import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../../../services/cart/cart.service';
import { CheckoutService } from '../../../../services/checkout/checkout.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout-summary',
  templateUrl: './checkout-summary.component.html',
  styleUrls: ['./checkout-summary.component.css', '../../../shared/css/checkout-shared.css'],
  standalone: false
})
export class CheckoutSummaryComponent implements OnInit, OnDestroy {
  private cartSubscription?: Subscription;
  private shippingSubscription?: Subscription;

  constructor(
    public cartService: CartService,
    public checkoutService: CheckoutService
  ) { }

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart$.subscribe(items => {
      this.checkoutService.cartItems = items;
    });
    
    this.shippingSubscription = this.checkoutService.selectedShippingChanged.subscribe(() => {
      // Recalcular opções de parcelamento quando o frete mudar
      this.checkoutService.calculateInstallmentOptions();
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if (this.shippingSubscription) {
      this.shippingSubscription.unsubscribe();
    }
  }
}