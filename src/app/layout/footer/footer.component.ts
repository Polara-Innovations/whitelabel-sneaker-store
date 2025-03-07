// src/app/components/footer/footer.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemeService } from '../../services/theme/theme.service';
import { FooterConfig, FooterSection } from '../../models/footer.model';
import { Subscription } from 'rxjs';
import { FooterService } from '../../services/api/footer/footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: false
})
export class FooterComponent implements OnInit, OnDestroy {
  footerConfig: FooterConfig | null = null;
  currentYear: number = new Date().getFullYear();
  newsletterForm: FormGroup;
  private subscription: Subscription = new Subscription();
  
  constructor(
    private footerService: FooterService,
    private themeService: ThemeService,
    private fb: FormBuilder
  ) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.subscription.add(
      this.footerService.footerConfig$.subscribe(config => {
        this.footerConfig = config;
      })
    );
    
    this.footerService.loadFooterConfig().subscribe();
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  /**
   * Retorna as seções habilitadas de um tipo específico
   */
  getSections(type?: string): FooterSection[] {
    if (!this.footerConfig) return [];
    
    if (type) {
      return this.footerConfig.sections.filter(section => section.type === type && section.enabled);
    }
    
    return this.footerConfig.sections;
  }
  
  /**
   * Verifica se uma seção de um tipo específico está habilitada
   */
  hasSection(type: string): boolean {
    if (!this.footerConfig) return false;
    return this.footerConfig.sections.some(section => section.type === type && section.enabled);
  }
  
  /**
   * Formata o texto de copyright
   */
  getCopyrightText(): string {
    if (!this.footerConfig) return '';
    
    const companyName = this.footerConfig.companyName || 'Sneaker Store';
    const customText = this.footerConfig.copyrightText || `© ${this.currentYear} ${companyName}. Todos os direitos reservados.`;
    
    return customText.replace('{year}', this.currentYear.toString());
  }
  
  /**
   * Manipula o envio do formulário de newsletter
   */
  onNewsletterSubmit(): void {
    // if (this.newsletterForm.valid) {
    //   const email = this.newsletterForm.value.email;
      
    //   // Mostrar modal de carregamento
    //   const loadingModal = this.modalService.showLoading('Enviando inscrição...');
      
    //   // Simular chamada de API (substituir por chamada real)
    //   setTimeout(() => {
    //     // Fechar modal de carregamento
    //     loadingModal.close();
        
    //     // Mostrar modal de sucesso
    //     this.modalService.openSuccess({
    //       title: 'Inscrição Realizada',
    //       message: `O email ${email} foi inscrito com sucesso em nossa newsletter!`,
    //       size: 'md'
    //     });
        
    //     // Resetar o formulário após o envio
    //     this.newsletterForm.reset();
    //   }, 1500);
    // } else {
    //   // Mostrar modal de erro para formulário inválido
    //   this.modalService.openError({
    //     title: 'Erro na Inscrição',
    //     message: 'Por favor, informe um endereço de email válido.',
    //     size: 'md'
    //   });
    // }
  }
  
  /**
   * Abre o modal de termos de uso
   */
  openTermsModal(): void {
    // this.modalService.openTerms().result.subscribe(accepted => {
    //   if (accepted) {
    //     console.log('Termos aceitos pelo usuário');
    //   } else {
    //     console.log('Termos recusados pelo usuário');
    //   }
    // });
  }
  
  /**
   * Abre o modal de política de privacidade
   */
  openPrivacyModal(): void {
    // this.modalService.openPrivacy();
  }
  
  /**
   * Abre links externos em nova aba
   */
  openLink(url: string, external: boolean = false): void {
    if (external) {
      window.open(url, '_blank');
    } else if (url.startsWith('/terms')) {
      this.openTermsModal();
      return;
    } else if (url.startsWith('/privacy')) {
      this.openPrivacyModal();
      return;
    }
  }
  
  /**
   * Abre o modal de confirmação para contato
   */
  openContactConfirmation(): void {
    // this.modalService.openConfirm({
    //   title: 'Contato',
    //   message: 'Deseja entrar em contato com nossa equipe agora?',
    //   confirmText: 'Sim, entrar em contato',
    //   cancelText: 'Não, mais tarde'
    // }).result.subscribe(result => {
    //   if (result) {
    //     // Redirecionar para a página de contato
    //     window.location.href = '/contact';
    //   }
    // });
  }

  /**
   * Abre o modal de cookies
   */
  openCookiesModal(): void {
  //   this.modalService.openCookies().result.subscribe(accepted => {
  //     if (accepted) {
  //       console.log('Cookies aceitos pelo usuário');
  //     } else {
  //       console.log('Cookies recusados pelo usuário');
  //     }
  //   });
  }
}