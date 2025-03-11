// src/app/components/footer/footer.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemeService } from '../../../services/theme/theme.service';
import { FooterConfig, FooterSection } from '../../../models/footer.model';
import { Subscription } from 'rxjs';
import { FooterService } from '../../../services/api/footer/footer.service';
import { ModalService } from '../../../services/modal/modal.service';

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
    private fb: FormBuilder,
    private modalService: ModalService
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
    if (this.newsletterForm.valid) {
      const email = this.newsletterForm.value.email;

      // Abrir modal de confirmação antes de processar
      this.modalService.openConfirmationModal(
        'Confirmação de Inscrição na Newsletter',
        `Ao se inscrever com o email <strong>${email}</strong>, você concorda em receber:<br><br>
        • Notificações sobre novos produtos e lançamentos<br>
        • Ofertas exclusivas e promoções especiais<br>
        • Conteúdo personalizado baseado em suas preferências<br>
        • Atualizações sobre eventos e novidades da nossa marca<br><br>
        Seus dados serão tratados conforme nossa Política de Privacidade e você poderá cancelar sua inscrição a qualquer momento através do link presente em nossos emails.`,
        'Sim, quero me inscrever',
        'Não, obrigado'
      ).subscribe(result => {
        if (result) {
          // Usuário confirmou, proceder com a inscrição

          // Mostrar modal de carregamento/processamento
          this.modalService.openInfoModal(
            'Processando...',
            'Estamos processando sua inscrição, por favor aguarde.'
          );

            // Fechar todos os modais
            this.modalService.dismissAll();

            // Mostrar modal de sucesso
            this.modalService.openInfoModal(
              'Inscrição Realizada com Sucesso',
              `O email ${email} foi inscrito com sucesso em nossa newsletter!`,
              `<p>Enviamos um email de confirmação para <strong>${email}</strong>. 
              Por favor, verifique sua caixa de entrada e confirme sua inscrição 
              clicando no link enviado.</p>
              
              <p>Se não encontrar o email, verifique também sua pasta de spam ou lixo eletrônico.</p>`,
              5000
            );

            // Resetar o formulário após o envio
            this.newsletterForm.reset();
        }
        // Se o usuário cancelar, não fazemos nada
      });
    } else {
      // Mostrar modal de erro para formulário inválido
      this.modalService.openErrorModal(
        'Erro na Inscrição',
        'Por favor, informe um endereço de email válido.',
        'O formato do email informado não é válido. Verifique se o email está correto e tente novamente.',
        false,
        5000
      );
    }
  }

  /**
   * Abre o modal de termos de uso
   */
  openTermsModal(): void {
    this.modalService.openTermsModal();
  }

  /**
   * Abre o modal de política de privacidade
   */
  openPrivacyModal(): void {
    this.modalService.openPrivacyModal();
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
    this.modalService.openConfirmationModal(
      'Contato',
      'Deseja entrar em contato com nossa equipe agora?',
      'Sim, entrar em contato',
      'Não, mais tarde'
    ).subscribe((result: any) => {
      if (result) {
        window.location.href = '/contact';
      }
    });
  }

  /**
   * Abre o modal de cookies
   */
  openCookiesModal(): void {
    this.modalService.openCookiesModal();
  }
}