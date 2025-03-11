import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutService } from '../../../../services/checkout/checkout.service';
import { ModalService } from '../../../../services/modal/modal.service';

@Component({
selector: 'app-checkout-shipping',
templateUrl: './checkout-shipping.component.html',
styleUrls: ['./checkout-shipping.component.css', '../../../shared/css/checkout-shared.css'],
standalone: false
})
export class CheckoutShippingComponent implements OnInit {
addressForm: FormGroup;
newAddress: boolean = false;
isLoading: boolean = false;
scheduledDelivery: boolean = false;
selectedDeliveryDate: Date | null = null;
selectedDeliveryTimeSlot: string | null = null;
availableDeliveryDates: Date[] = [];
availableDeliveryTimeSlots: string[] = [];

constructor(
private fb: FormBuilder,
public checkoutService: CheckoutService,
private modalService: ModalService
) {
this.addressForm = this.fb.group({
name: ['', Validators.required],
zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
street: ['', Validators.required],
number: ['', Validators.required],
complement: [''],
neighborhood: ['', Validators.required],
city: ['', Validators.required],
state: ['', Validators.required],
saveAddress: [true]
});
}

ngOnInit(): void {
// Recuperar dados salvos se existirem
const savedData = this.checkoutService.getShippingData();
if (savedData) {
this.newAddress = savedData.newAddress || false;
this.scheduledDelivery = savedData.scheduledDelivery || false;
this.selectedDeliveryDate = savedData.selectedDeliveryDate ? new Date(savedData.selectedDeliveryDate) : null;
this.selectedDeliveryTimeSlot = savedData.selectedDeliveryTimeSlot || null;

  if (savedData.addressForm) {
    this.addressForm.patchValue(savedData.addressForm);
  }
}

// Gerar datas disponíveis para agendamento
this.generateAvailableDeliveryDates();

// Gerar horários disponíveis
this.generateAvailableTimeSlots();

// Carregar opções de frete se um endereço já estiver selecionado
if (this.checkoutService.selectedAddress || 
  (this.newAddress && this.addressForm.get('zipCode')?.valid)) {
const zipCode = this.checkoutService.selectedAddress?.zipCode || 
               this.addressForm.get('zipCode')?.value;
if (zipCode) {
  this.loadShippingOptions(zipCode);
}
}
}

selectAddress(address: any): void {
this.checkoutService.selectedAddress = address;
this.newAddress = false;

// Carregar opções de frete para este endereço
this.loadShippingOptions(address.zipCode);
}

addNewAddress(): void {
this.checkoutService.selectedAddress = null;
this.newAddress = true;
this.addressForm.reset({
saveAddress: true
});
this.checkoutService.shippingOptions = [];
}

searchAddressByCep(): void {
const zipCode = this.addressForm.get('zipCode')?.value;
if (!zipCode || !/^\d{5}-?\d{3}$/.test(zipCode)) {
this.modalService.openNotificationModal(
  'error',
  'CEP inválido',
  'Por favor, digite um CEP válido no formato 00000-000.',
  3000
);
return;
}

this.isLoading = true;

// Chamada ao serviço de busca de CEP
this.checkoutService.searchAddressByCep(zipCode).then(address => {
if (address) {
  this.addressForm.patchValue({
    street: address.street,
    neighborhood: address.neighborhood,
    city: address.city,
    state: address.state
  });
  
  // Carregar opções de frete para este CEP
  this.loadShippingOptions(zipCode);
}

this.isLoading = false;
}).catch(() => {
this.isLoading = false;
this.modalService.openNotificationModal(
  'error',
  'CEP não encontrado',
  'Não foi possível encontrar o endereço para o CEP informado.',
  3000
);
});
}

loadShippingOptions(zipCode: string): void {
this.isLoading = true;

this.checkoutService.loadShippingOptions(zipCode).then(() => {
this.isLoading = false;
}).catch(() => {
this.isLoading = false;
this.modalService.openNotificationModal(
  'error',
  'Erro ao calcular frete',
  'Não foi possível calcular as opções de frete para o endereço informado.',
  3000
);
});
}

selectShipping(option: any): void {
this.checkoutService.selectShipping(option);

// Verificar se a opção permite agendamento
this.scheduledDelivery = false;

// Apenas opções expressas permitem agendamento
if (option.id === 'express' || option.id === 'sameday') {
this.availableDeliveryDates = this.generateAvailableDeliveryDates(option.id === 'sameday');
}
}

toggleScheduledDelivery(): void {
this.scheduledDelivery = !this.scheduledDelivery;

if (!this.scheduledDelivery) {
this.selectedDeliveryDate = null;
this.selectedDeliveryTimeSlot = null;
}
}

selectDeliveryDate(date: Date): void {
this.selectedDeliveryDate = date;
}

selectDeliveryTimeSlot(slot: string): void {
this.selectedDeliveryTimeSlot = slot;
}

generateAvailableDeliveryDates(includeSameDay: boolean = false): Date[] {
const dates: Date[] = [];
const today = new Date();

if (includeSameDay) {
dates.push(today);
}

// Adicionar próximos 15 dias (excluindo domingos)
for (let i = 1; i <= 15; i++) {
const date = new Date();
date.setDate(today.getDate() + i);

// Excluir domingos (0 = domingo)
if (date.getDay() !== 0) {
  dates.push(date);
}
}

return dates;
}

generateAvailableTimeSlots(): void {
// Horários disponíveis para entrega
this.availableDeliveryTimeSlots = [
'08:00 - 12:00',
'12:00 - 16:00',
'16:00 - 20:00'
];
}

saveAndContinue(): void {
if (!this.checkoutService.selectedAddress && !this.newAddress) {
this.modalService.openNotificationModal(
  'error',
  'Endereço necessário',
  'Por favor, selecione um endereço de entrega ou cadastre um novo.',
  3000
);
return;
}

if (this.newAddress && this.addressForm.invalid) {
this.checkoutService.markFormGroupTouched(this.addressForm);

this.modalService.openNotificationModal(
  'error',
  'Endereço inválido',
  'Por favor, preencha corretamente todos os campos do endereço.',
  3000
);
return;
}

if (!this.checkoutService.selectedShipping) {
this.modalService.openNotificationModal(
  'error',
  'Frete necessário',
  'Por favor, selecione uma opção de entrega.',
  3000
);
return;
}

if (this.scheduledDelivery && (!this.selectedDeliveryDate || !this.selectedDeliveryTimeSlot)) {
this.modalService.openNotificationModal(
  'error',
  'Agendamento incompleto',
  'Por favor, selecione uma data e horário para a entrega agendada.',
  3000
);
return;
}

// Salvar dados de endereço e entrega
this.checkoutService.setShippingData({
newAddress: this.newAddress,
addressForm: this.newAddress ? this.addressForm.value : null,
scheduledDelivery: this.scheduledDelivery,
selectedDeliveryDate: this.selectedDeliveryDate,
selectedDeliveryTimeSlot: this.selectedDeliveryTimeSlot
});

// Se for um novo endereço e o usuário optou por salvá-lo
if (this.newAddress && this.addressForm.get('saveAddress')?.value) {
this.checkoutService.saveNewAddress(this.addressForm.value);
}

// Avançar para a próxima etapa
this.checkoutService.nextStep();
}
}