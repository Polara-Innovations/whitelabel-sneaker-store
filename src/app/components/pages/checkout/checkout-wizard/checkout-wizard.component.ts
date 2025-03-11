import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../../../services/checkout/checkout.service';

@Component({
  selector: 'app-checkout-wizard',
  templateUrl: './checkout-wizard.component.html',
  styleUrls: ['./checkout-wizard.component.css', '../../../shared/css/checkout-shared.css'],
  standalone: false
})
export class CheckoutWizardComponent implements OnInit {
  steps = [
    { number: 1, name: 'Identificação', completed: false },
    { number: 2, name: 'Entrega', completed: false },
    { number: 3, name: 'Pagamento', completed: false },
    { number: 4, name: 'Revisão', completed: false }
  ];
  
  constructor(public checkoutService: CheckoutService) { }

  ngOnInit(): void {
    // Inscrever-se para receber atualizações sobre o progresso do checkout
    this.checkoutService.currentStep$.subscribe(step => {
      // Atualizar o status de cada etapa
      this.steps.forEach(s => {
        s.completed = s.number < step;
      });
    });
  }

  goToStep(step: number): void {
    if (step < this.checkoutService.currentStep) {
      this.checkoutService.setCurrentStep(step);
    }
  }
}