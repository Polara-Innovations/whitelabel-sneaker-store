import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  standalone: false
})
export class ContactFormComponent implements OnInit {
  @Input() texts: any;
  
  contactForm!: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.markFormGroupTouched(this.contactForm);
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    // Simulação de envio para API
    setTimeout(() => {
      // Simulação de sucesso
      this.isSubmitting = false;
      this.submitSuccess = true;
      this.contactForm.reset();
      
      // Limpar mensagem de sucesso após 5 segundos
      setTimeout(() => {
        this.submitSuccess = false;
      }, 5000);
    }, 1500);
  }

  // Função auxiliar para marcar todos os campos como tocados
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Funções auxiliares para validação de campos
  hasError(controlName: string, errorName: string): boolean {
    return this.contactForm.get(controlName)?.hasError(errorName) 
      && this.contactForm.get(controlName)?.touched || false;
  }

  isInvalid(controlName: string): boolean {
    return this.contactForm.get(controlName)?.invalid 
      && this.contactForm.get(controlName)?.touched || false;
  }
}