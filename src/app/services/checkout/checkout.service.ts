import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartService } from '../cart/cart.service';
import { ModalService } from '../modal/modal.service';

@Injectable({
providedIn: 'root'
})
export class CheckoutService {
// Etapas do checkout
private currentStepSubject = new BehaviorSubject(1);
currentStep$ = this.currentStepSubject.asObservable();
totalSteps: number = 4;

// Dados do carrinho
cartItems: any[] = [];
subtotal: number = 0;
discount: number = 0;

// Dados de identificação
identificationData: any = null;

// Dados de endereço e frete
savedAddresses: any[] = [];
selectedAddress: any = null;
shippingOptions: any[] = [];
selectedShipping: any = null;
shippingData: any = null;
selectedShippingChanged = new Subject();

// Dados de pagamento
paymentMethods: any[] = [];
savedCreditCards: any[] = [];
selectedPaymentMethod: any = null;
installmentOptions: any[] = [];
selectedInstallment: any = null;
paymentData: any = null;

// Dados de revisão
reviewData: any = null;

// Dados do pedido finalizado
orderNumber: string = '';

constructor(
private cartService: CartService,
private router: Router,
private modalService: ModalService
) { }

// Getters e setters
get currentStep(): number {
return this.currentStepSubject.value;
}

setCurrentStep(step: number): void {
if (step >= 1 && step <= this.totalSteps) {
this.currentStepSubject.next(step);
}
}

nextStep(): void {
const nextStep = this.currentStep + 1;
if (nextStep <= this.totalSteps) {
this.setCurrentStep(nextStep);
window.scrollTo(0, 0);
}
}

prevStep(): void {
const prevStep = this.currentStep - 1;
if (prevStep >= 1) {
this.setCurrentStep(prevStep);
window.scrollTo(0, 0);
}
}

// Inicialização do checkout
initCheckout(): void {
// Carregar dados do carrinho
this.cartService.cart$.subscribe(items => {
this.cartItems = items;
});

this.cartService.cartTotal$.subscribe(total => {
  this.subtotal = total;
});

// Carregar endereços salvos (simulação)
this.loadSavedAddresses();

// Carregar opções de pagamento
this.loadPaymentMethods();

// Carregar cartões salvos (simulação)
this.loadSavedCreditCards();

// Recuperar dados de checkout salvos em sessão anterior
this.loadCheckoutData();
}

// Carregar dados salvos
loadCheckoutData(): void {
const savedData = sessionStorage.getItem('checkout_data');
if (savedData) {
try {
const data = JSON.parse(savedData);

    // Restaurar dados de identificação
    if (data.identificationData) {
      this.identificationData = data.identificationData;
    }
    
    // Restaurar dados de entrega
    if (data.selectedAddress) {
      this.selectedAddress = data.selectedAddress;
    }
    
    if (data.shippingData) {
      this.shippingData = data.shippingData;
      
      // Recarregar opções de frete se necessário
      if (this.selectedAddress || (this.shippingData.newAddress && this.shippingData.addressForm)) {
        const zipCode = this.selectedAddress ? 
                       this.selectedAddress.zipCode : 
                       this.shippingData.addressForm.zipCode;
        
        if (zipCode) {
          this.loadShippingOptions(zipCode);
        }
      }
    }
    
    // Restaurar dados de pagamento
    if (data.selectedPaymentMethod) {
      this.selectedPaymentMethod = data.selectedPaymentMethod;
    }
    
    if (data.selectedShipping) {
      this.selectedShipping = data.selectedShipping;
      this.calculateInstallmentOptions();
    }
    
    if (data.selectedInstallment) {
      this.selectedInstallment = data.selectedInstallment;
    }
    
    if (data.paymentData) {
      this.paymentData = data.paymentData;
    }
    
    // Restaurar dados de revisão
    if (data.reviewData) {
      this.reviewData = data.reviewData;
    }
    
    // Restaurar etapa atual
    if (data.currentStep) {
      this.setCurrentStep(data.currentStep);
    }
  } catch (error) {
    console.error('Erro ao carregar dados de checkout:', error);
  }
}
}

// Salvar dados de checkout
saveCheckoutData(): void {
const data = {
currentStep: this.currentStep,
identificationData: this.identificationData,
selectedAddress: this.selectedAddress,
shippingData: this.shippingData,
selectedShipping: this.selectedShipping,
selectedPaymentMethod: this.selectedPaymentMethod,
selectedInstallment: this.selectedInstallment,
paymentData: this.paymentData,
reviewData: this.reviewData
};

sessionStorage.setItem('checkout_data', JSON.stringify(data));
}

// Limpar dados de checkout
clearCheckoutData(): void {
sessionStorage.removeItem('checkout_data');
}

// Manipulação de formulários
markFormGroupTouched(formGroup: FormGroup): void {
Object.keys(formGroup.controls).forEach(key => {
const control = formGroup.get(key);
control?.markAsTouched();

  if (control instanceof FormGroup) {
    this.markFormGroupTouched(control);
  }
});
}

// Dados de identificação
setIdentificationData(data: any): void {
this.identificationData = data;
this.saveCheckoutData();
}

getIdentificationData(): any {
return this.identificationData;
}

// Dados de endereço e frete
loadSavedAddresses(): void {
// Simulação de endereços salvos
this.savedAddresses = [
{
id: 1,
name: 'Casa',
street: 'Rua das Flores',
number: '123',
complement: 'Apto 101',
neighborhood: 'Jardim Primavera',
city: 'São Paulo',
state: 'SP',
zipCode: '01234-567',
isDefault: true
},
{
id: 2,
name: 'Trabalho',
street: 'Avenida Paulista',
number: '1000',
complement: 'Sala 1010',
neighborhood: 'Bela Vista',
city: 'São Paulo',
state: 'SP',
zipCode: '01310-100',
isDefault: false
}
];

// Selecionar endereço padrão
const defaultAddress = this.savedAddresses.find(a => a.isDefault);
if (defaultAddress && !this.selectedAddress) {
  this.selectedAddress = defaultAddress;
}
}

searchAddressByCep(zipCode: string): Promise<any> {
return new Promise((resolve, reject) => {
// Simulação de busca de CEP
setTimeout(() => {
// Dados de exemplo
const address = {
street: 'Rua Exemplo',
neighborhood: 'Bairro Teste',
city: 'Cidade Exemplo',
state: 'SP'
};

    resolve(address);
  }, 1000);
});
}

loadShippingOptions(zipCode: string): Promise<void> {
return new Promise<void>((resolve, reject) => {
// Simulação de cálculo de frete
setTimeout(() => {
const today = new Date();

    this.shippingOptions = [
      {
        id: 'standard',
        name: 'Entrega Padrão',
        price: 15.90,
        deliveryTime: '5 a 8 dias úteis',
        deliveryDate: this.addBusinessDays(today, 8)
      },
      {
        id: 'express',
        name: 'Entrega Expressa',
        price: 25.90,
        deliveryTime: '2 a 3 dias úteis',
        deliveryDate: this.addBusinessDays(today, 3)
      },
      {
        id: 'sameday',
        name: 'Entrega no Mesmo Dia',
        price: 35.90,
        deliveryTime: 'Hoje (pedidos até 12h)',
        deliveryDate: today
      }
    ];
    
    // Verificar se o valor da compra é acima de um limite para frete grátis
    if (this.subtotal > 150) {
      this.shippingOptions.unshift({
        id: 'free',
        name: 'Frete Grátis',
        price: 0,
        deliveryTime: '7 a 10 dias úteis',
        deliveryDate: this.addBusinessDays(today, 10)
      });
    }
    
    resolve();
  }, 1000);
});
}

selectShipping(option: any): void {
this.selectedShipping = option;
this.selectedShippingChanged.next(this.selectedShipping);
this.saveCheckoutData();
}

setShippingData(data: any): void {
this.shippingData = data;
this.saveCheckoutData();
}

getShippingData(): any {
return this.shippingData;
}

saveNewAddress(addressData: any): void {
// Simulação de salvamento de novo endereço
const newId = this.savedAddresses.length > 0 ?
Math.max(...this.savedAddresses.map(a => a.id)) + 1 : 1;

const newAddress = {
  id: newId,
  name: addressData.name,
  street: addressData.street,
  number: addressData.number,
  complement: addressData.complement,
  neighborhood: addressData.neighborhood,
  city: addressData.city,
  state: addressData.state,
  zipCode: addressData.zipCode,
  isDefault: false
};

this.savedAddresses.push(newAddress);
this.selectedAddress = newAddress;
}

// Dados de pagamento
loadPaymentMethods(): void {
this.paymentMethods = [
{ id: 'credit', name: 'Cartão de Crédito', icon: 'fa-credit-card', type: 'credit' },
{ id: 'debit', name: 'Cartão de Débito', icon: 'fa-credit-card', type: 'debit' },
{ id: 'pix', name: 'PIX', icon: 'fa-qrcode', type: 'pix' },
{ id: 'boleto', name: 'Boleto Bancário', icon: 'fa-barcode', type: 'boleto' },
{ id: 'googlepay', name: 'Google Pay', icon: 'fa-google', type: 'wallet' },
{ id: 'applepay', name: 'Apple Pay', icon: 'fa-apple', type: 'wallet' }
];
}

loadSavedCreditCards(): void {
// Simulação de cartões salvos
this.savedCreditCards = [
{
id: 1,
lastDigits: '1234',
brand: 'Visa',
expiryMonth: '12',
expiryYear: '2025',
holderName: 'JOÃO SILVA',
isDefault: true
},
{
id: 2,
lastDigits: '5678',
brand: 'Mastercard',
expiryMonth: '06',
expiryYear: '2024',
holderName: 'JOÃO SILVA',
isDefault: false
}
];
}

calculateInstallmentOptions(): void {
// Calcular opções de parcelamento com base no valor total
const total = this.getTotal();

this.installmentOptions = [
  { number: 1, value: total, interestRate: 0, total: total }
];

// Adicionar opções de parcelamento (até 12x)
for (let i = 2; i <= 12; i++) {
  // Sem juros até 6x
  let interestRate = i <= 6 ? 0 : 1.99;
  let installmentTotal = interestRate > 0 
    ? total * Math.pow(1 + interestRate/100, i)
    : total;
  
  this.installmentOptions.push({
    number: i,
    value: installmentTotal / i,
    interestRate: interestRate,
    total: installmentTotal
  });
}
}

setPaymentData(data: any): void {
this.paymentData = data;
this.saveCheckoutData();
}

getPaymentData(): any {
return this.paymentData;
}

saveNewCreditCard(cardData: any): void {
// Simulação de salvamento de novo cartão
const newId = this.savedCreditCards.length > 0 ?
Math.max(...this.savedCreditCards.map(c => c.id)) + 1 : 1;

// Extrair últimos 4 dígitos do número do cartão
const cardNumber = cardData.cardNumber.replace(/\s/g, '');
const lastDigits = cardNumber.substring(cardNumber.length - 4);

// Extrair mês e ano de validade
const [expiryMonth, expiryYear] = cardData.cardExpiry.split('/');

const newCard = {
  id: newId,
  lastDigits: lastDigits,
  brand: this.detectCardBrand(cardNumber),
  expiryMonth: expiryMonth,
  expiryYear: '20' + expiryYear, // Assumindo formato MM/AA
  holderName: cardData.cardName.toUpperCase(),
  isDefault: false
};

this.savedCreditCards.push(newCard);
}

detectCardBrand(cardNumber: string): string {
// Detecção simples de bandeira de cartão
if (cardNumber.startsWith('4')) {
return 'Visa';
} else if (cardNumber.startsWith('5')) {
return 'Mastercard';
} else if (cardNumber.startsWith('3')) {
return 'American Express';
} else {
return 'Desconhecida';
}
}

// Dados de revisão
setReviewData(data: any): void {
this.reviewData = data;
this.saveCheckoutData();
}

getReviewData(): any {
  return this.reviewData;
}

// Finalização do pedido
placeOrder(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Simulação de processamento do pedido
    setTimeout(() => {
      try {
        // Gerar número do pedido
        this.orderNumber = `PED${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
        
        // Limpar carrinho
        this.cartService.clearCart();
        
        // Limpar dados de checkout
        this.clearCheckoutData();
        
        // Mostrar confirmação
        this.modalService.openNotificationModal(
          'success',
          'Pedido realizado com sucesso!',
          `Seu pedido #${this.orderNumber} foi confirmado. Você receberá um e-mail com os detalhes.`,
          5000
        );
        
        // Redirecionar para página de confirmação
        this.router.navigate(['/order-confirmation'], { 
          queryParams: { 
            orderNumber: this.orderNumber 
          } 
        });
        
        resolve();
      } catch (error) {
        reject(error);
      }
    }, 2000);
  });
}

// Utilitários
formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

formatDate(date: Date | undefined): string {
  if (!date) return '';
  return new Date(date).toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: '2-digit',
    year: 'numeric' 
  });
}

addBusinessDays(date: Date, days: number): Date {
  const result = new Date(date);
  let addedDays = 0;
  
  while (addedDays < days) {
    result.setDate(result.getDate() + 1);
    // Pular finais de semana (0 = domingo, 6 = sábado)
    if (result.getDay() !== 0 && result.getDay() !== 6) {
      addedDays++;
    }
  }
  
  return result;
}

getTotal(): number {
  const shippingCost = this.selectedShipping ? this.selectedShipping.price : 0;
  return this.subtotal + shippingCost - this.discount;
}
}