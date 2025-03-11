import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../../../services/checkout/checkout.service';
import { ModalService } from '../../../../services/modal/modal.service';
import { Router } from '@angular/router';

@Component({
selector: 'app-checkout-review',
templateUrl: './checkout-review.component.html',
styleUrls: ['../../../shared/css/checkout-shared.css', './checkout-review.component.css'],
standalone: false
})
export class CheckoutReviewComponent implements OnInit {
termsAccepted: boolean = false;
isSubmitting: boolean = false;

constructor(
public checkoutService: CheckoutService,
private modalService: ModalService,
private router: Router
) { }

ngOnInit(): void {
// Recuperar dados salvos se existirem
const savedData = this.checkoutService.getReviewData();
if (savedData) {
this.termsAccepted = savedData.termsAccepted || false;
}
}

openTermsModal(): void {
this.modalService.openTermsModal();
}

openPrivacyModal(): void {
this.modalService.openPrivacyModal();
}

placeOrder(): void {
  if (!this.termsAccepted) {
    this.modalService.openNotificationModal(
      'error',
      'Termos e condições',
      'Por favor, aceite os termos e condições para finalizar a compra.',
      3000
    );
    return;
  }
  
  // Salvar dados de revisão
  this.checkoutService.setReviewData({
    termsAccepted: this.termsAccepted
  });
  
  this.isSubmitting = true;
  
  // Processar o pedido
  this.checkoutService.placeOrder().then(() => {
    this.isSubmitting = false;
  }).catch(() => {
    this.isSubmitting = false;
    this.modalService.openNotificationModal(
      'error',
      'Erro ao processar pedido',
      'Ocorreu um erro ao processar seu pedido. Por favor, tente novamente.',
      3000
    );
  });

    this.router.navigate(['/order-details/1']);
}
}