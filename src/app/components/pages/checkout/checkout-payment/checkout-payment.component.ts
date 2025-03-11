import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutService } from '../../../../services/checkout/checkout.service';
import { ModalService } from '../../../../services/modal/modal.service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css', '../../../shared/css/checkout-shared.css'],
  standalone: false
})
export class CheckoutPaymentComponent implements OnInit {
  paymentForm: FormGroup;
  selectedCreditCard: any = null;

  constructor(
    private fb: FormBuilder,
    public checkoutService: CheckoutService,
    private modalService: ModalService
  ) {
    this.paymentForm = this.fb.group({
      paymentType: ['', Validators.required],
      // Campos para cartão de crédito
      cardNumber: [''],
      cardName: [''],
      cardExpiry: [''],
      cardCvv: [''],
      saveCard: [false],
      installments: [''],
      // Campos para boleto/PIX
      cpfCnpj: ['']
    });
  }

  ngOnInit(): void {
    // Recuperar dados salvos se existirem
    const savedData = this.checkoutService.getPaymentData();
    if (savedData) {
      this.paymentForm.patchValue(savedData.paymentForm || {});
      this.selectedCreditCard = savedData.selectedCreditCard || null;
      
      if (savedData.selectedPaymentMethod) {
        this.selectPaymentMethod(savedData.selectedPaymentMethod);
      }
      
      if (savedData.selectedInstallment) {
        this.selectInstallment(savedData.selectedInstallment);
      }
    }

    // Configurar validação condicional para pagamento
    this.paymentForm.get('paymentType')?.valueChanges.subscribe(paymentType => {
      const cardControls = ['cardNumber', 'cardName', 'cardExpiry', 'cardCvv', 'installments'];
      const otherControls = ['cpfCnpj'];
      
      if (paymentType === 'credit' || paymentType === 'debit') {
        cardControls.forEach(control => {
          this.paymentForm.get(control)?.setValidators([Validators.required]);
          this.paymentForm.get(control)?.updateValueAndValidity();
        });
        
        otherControls.forEach(control => {
          this.paymentForm.get(control)?.clearValidators();
          this.paymentForm.get(control)?.updateValueAndValidity();
        });
      } else if (paymentType === 'boleto' || paymentType === 'pix') {
        cardControls.forEach(control => {
          this.paymentForm.get(control)?.clearValidators();
          this.paymentForm.get(control)?.updateValueAndValidity();
        });
        
        otherControls.forEach(control => {
          this.paymentForm.get(control)?.setValidators([Validators.required]);
          this.paymentForm.get(control)?.updateValueAndValidity();
        });
      }
    });
  }

  selectPaymentMethod(method: any): void {
    this.checkoutService.selectedPaymentMethod = method;
    this.paymentForm.get('paymentType')?.setValue(method.id);
    
    // Se for cartão de crédito/débito, selecionar o cartão padrão
    if (method.type === 'credit' || method.type === 'debit') {
      const defaultCard = this.checkoutService.savedCreditCards.find(c => c.isDefault);
      if (defaultCard && !this.selectedCreditCard) {
        this.selectCreditCard(defaultCard);
      }
    }
  }

  selectCreditCard(card: any): void {
    this.selectedCreditCard = card;
    // Preencher formulário com dados do cartão
    this.paymentForm.patchValue({
      cardNumber: `**** **** **** ${card.lastDigits}`,
      cardName: card.holderName,
      cardExpiry: `${card.expiryMonth}/${card.expiryYear.substring(2)}`
    });
  }

  addNewCreditCard(): void {
    this.selectedCreditCard = null;
    this.paymentForm.patchValue({
      cardNumber: '',
      cardName: '',
      cardExpiry: '',
      cardCvv: '',
      saveCard: false
    });
  }

  selectInstallment(option: any): void {
    this.checkoutService.selectedInstallment = option;
  }

  saveAndContinue(): void {
    if (this.paymentForm.invalid) {
      this.checkoutService.markFormGroupTouched(this.paymentForm);
      
      this.modalService.openNotificationModal(
        'error',
        'Informações de pagamento inválidas',
        'Por favor, preencha corretamente todos os campos de pagamento.',
        3000
      );
      
      return;
    }
    
    const paymentType = this.paymentForm.get('paymentType')?.value;
    
    if ((paymentType === 'credit' || paymentType === 'debit') && !this.checkoutService.selectedInstallment) {
      this.modalService.openNotificationModal(
        'error',
        'Selecione o parcelamento',
        'Por favor, selecione uma opção de parcelamento.',
        3000
      );
      
      return;
    }
    
    // Salvar dados de pagamento
    this.checkoutService.setPaymentData({
      paymentForm: this.paymentForm.value,
      selectedCreditCard: this.selectedCreditCard,
      selectedPaymentMethod: this.checkoutService.selectedPaymentMethod,
      selectedInstallment: this.checkoutService.selectedInstallment
    });
    
    // Se for um novo cartão e o usuário optou por salvá-lo
    if (!this.selectedCreditCard && 
        (paymentType === 'credit' || paymentType === 'debit') && 
        this.paymentForm.get('saveCard')?.value) {
      this.checkoutService.saveNewCreditCard({
        cardNumber: this.paymentForm.get('cardNumber')?.value,
        cardName: this.paymentForm.get('cardName')?.value,
        cardExpiry: this.paymentForm.get('cardExpiry')?.value
      });
    }
    
    // Avançar para a próxima etapa
    this.checkoutService.nextStep();
  }
}