import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart/cart.service';
import { CheckoutService } from '../../../services/checkout/checkout.service';
import { ModalService } from '../../../services/modal/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css', '../../shared/css/checkout-shared.css'],
  standalone: false
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private cartSubscription: Subscription | null = null;

  constructor(
    public checkoutService: CheckoutService,
    private cartService: CartService,
    private router: Router,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    // Verificar se o carrinho está vazio
    this.cartSubscription = this.cartService.cart$.subscribe(items => {
      if (items.length === 0) {
        this.modalService.openNotificationModal(
          'error',
          'Carrinho vazio',
          'Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.',
          3000
        );
        this.router.navigate(['/cart']);
      }
    });

    // Inicializar o checkout
    this.checkoutService.initCheckout();
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    
    // Limpar dados temporários do checkout se o usuário sair sem finalizar
    this.checkoutService.clearCheckoutData();
  }

  nextStep(): void {
    this.checkoutService.nextStep();
  }

  prevStep(): void {
    this.checkoutService.prevStep();
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}