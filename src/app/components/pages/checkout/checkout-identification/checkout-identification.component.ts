import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutService } from '../../../../services/checkout/checkout.service';
import { ModalService } from '../../../../services/modal/modal.service';

@Component({
  selector: 'app-checkout-identification',
  templateUrl: './checkout-identification.component.html',
  styleUrls: ['./checkout-identification.component.css', '../../../shared/css/checkout-shared.css'],
  standalone: false
})
export class CheckoutIdentificationComponent implements OnInit {
  identificationForm: FormGroup;
  isGuestCheckout: boolean = false;
  
  // Validadores de senha
  passwordMeetsLength: boolean = false;
  passwordHasLetter: boolean = false;
  passwordHasNumber: boolean = false;

  constructor(
    private fb: FormBuilder,
    public checkoutService: CheckoutService,
    private modalService: ModalService
  ) {
    this.identificationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      createAccount: [false],
      password: [''],
      confirmPassword: ['']
    });
  }

  ngOnInit(): void {
    // Recuperar dados salvos se existirem
    const savedData = this.checkoutService.getIdentificationData();
    if (savedData) {
      this.identificationForm.patchValue(savedData);
      this.isGuestCheckout = savedData.isGuestCheckout || false;
    }

    // Configurar validação condicional para senha
    this.identificationForm.get('createAccount')?.valueChanges.subscribe(createAccount => {
      const passwordControl = this.identificationForm.get('password');
      const confirmPasswordControl = this.identificationForm.get('confirmPassword');
      
      if (createAccount) {
        passwordControl?.setValidators([Validators.required, Validators.minLength(8), this.passwordValidator]);
        confirmPasswordControl?.setValidators([Validators.required]);
      } else {
        passwordControl?.clearValidators();
        confirmPasswordControl?.clearValidators();
      }
      
      passwordControl?.updateValueAndValidity();
      confirmPasswordControl?.updateValueAndValidity();
    });
    
    // Monitorar mudanças na senha para validações em tempo real
    this.identificationForm.get('password')?.valueChanges.subscribe(password => {
      if (password) {
        this.passwordMeetsLength = password.length >= 8;
        this.passwordHasLetter = /[a-zA-Z]/.test(password);
        this.passwordHasNumber = /[0-9]/.test(password);
      } else {
        this.passwordMeetsLength = false;
        this.passwordHasLetter = false;
        this.passwordHasNumber = false;
      }
    });
  }

  passwordValidator(control: any) {
    const value = control.value;
    
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    
    if (!hasLetter || !hasNumber) {
      return { invalidPassword: true };
    }
    
    return null;
  }

  saveAndContinue(): void {
    if (this.identificationForm.invalid) {
      this.checkoutService.markFormGroupTouched(this.identificationForm);
      
      this.modalService.openNotificationModal(
        'error',
        'Informações inválidas',
        'Por favor, preencha corretamente todos os campos obrigatórios.',
        3000
      );
      
      return;
    }
    
    if (this.identificationForm.get('createAccount')?.value && 
        this.identificationForm.get('password')?.value !== this.identificationForm.get('confirmPassword')?.value) {
      this.modalService.openNotificationModal(
        'error',
        'Senhas não conferem',
        'As senhas digitadas não são iguais. Por favor, verifique.',
        3000
      );
      
      return;
    }
    
    // Salvar dados de identificação
    this.checkoutService.setIdentificationData({
      ...this.identificationForm.value,
      isGuestCheckout: this.isGuestCheckout
    });
    
    // Avançar para a próxima etapa
    this.checkoutService.nextStep();
  }
}