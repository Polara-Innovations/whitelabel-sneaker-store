import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as bootstrap from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  // Para modal de confirmação
  confirmationResult = new Subject<boolean>();
  confirmationTitle: string = '';
  confirmationMessage: string = '';
  confirmButtonLabel: string = 'Confirmar';
  cancelButtonLabel: string = 'Cancelar';

  // Para modal de erro
  errorTitle: string = '';
  errorMessage: string = '';
  errorDetails: string = '';
  showRetryButton: boolean = false;
  retryAction = new Subject<void>();

  // Para modal de aviso
  warningTitle: string = '';
  warningMessage: string = '';
  warningItems: string[] = [];
  warningResult = new Subject<boolean>();

  // Para modal de informação
  infoTitle: string = '';
  infoMessage: string = '';
  infoDetails: string = '';

  // Para modal de notificação
  notificationTitle: string = '';
  notificationMessage: string = '';
  notificationType: 'success' | 'error' | 'info' = 'info';

  // Temporizadores para fechar modais automaticamente
  private modalTimers: Map<string, any> = new Map();

  constructor() { }

  /**
   * Obtém uma instância do modal do Bootstrap
   */
  private getBootstrapModal(modalId: string, backdrop: boolean): any {
    const modalElement = document.getElementById(modalId);
    if (!modalElement) {
      console.warn(`Elemento com ID ${modalId} não encontrado`);
      return null;
    }

    // Usar o bootstrap importado diretamente
    let modal = bootstrap.Modal.getInstance(modalElement);

    let backdropValue: boolean | "static" | undefined = backdrop ? 'static' : false;

    if (!modal) {
      modal = new bootstrap.Modal(modalElement, {
        backdrop: backdropValue,
        keyboard: false
      });
    }

    return modal;
  }

  /**
   * Configura um temporizador para fechar o modal automaticamente
   */
  private setAutoCloseTimer(modalId: string, durationTime: number): void {
    // Limpar qualquer temporizador existente para este modal
    this.clearAutoCloseTimer(modalId);

    if (durationTime > 0) {
      // Configurar novo temporizador
      const timerId = setTimeout(() => {
        this.dismissAll();
        this.modalTimers.delete(modalId);
      }, durationTime);

      // Armazenar o ID do temporizador
      this.modalTimers.set(modalId, timerId);

      // Adicionar contador regressivo visual ao modal (opcional)
      this.addCountdownIndicator(modalId, durationTime);
    }
  }

  /**
  * Limpa o temporizador de fechamento automático para um modal
  */
  public clearAutoCloseTimer(modalId: string): void {
    if (this.modalTimers.has(modalId)) {
      clearTimeout(this.modalTimers.get(modalId));
      this.modalTimers.delete(modalId);

      const modalElement = document.getElementById(modalId);
      if (modalElement) {
        const countdownElement = modalElement.querySelector('.modal-countdown');
        if (countdownElement) {
          (countdownElement as HTMLElement).style.width = '0%';
        }
      }
    }
  }

  /**
   * Adiciona um indicador visual de contagem regressiva ao modal
   */
  private addCountdownIndicator(modalId: string, durationTime: number): void {
    const modalElement = document.getElementById(modalId);
    if (!modalElement) return;

    // Procurar ou criar o elemento de contagem regressiva
    let countdownElement = modalElement.querySelector('.modal-countdown');
    if (!countdownElement) {
      countdownElement = document.createElement('div');
      countdownElement.className = 'modal-countdown';

      // Estilizar o elemento de contagem regressiva
      const style = countdownElement as HTMLElement;
      style.style.position = 'absolute';
      style.style.bottom = '0';
      style.style.left = '0';
      style.style.width = '0%';
      style.style.height = '3px';
      style.style.backgroundColor = '#007bff';
      style.style.transition = 'width linear';

      // Adicionar ao modal
      const modalContent = modalElement.querySelector('.modal-content');
      if (modalContent) {
        (modalContent as HTMLElement).style.position = 'relative';
        modalContent.appendChild(countdownElement);
      }
    }

    // Animação da barra de progresso
    const countdownBar = countdownElement as HTMLElement;
    countdownBar.style.width = '0%';

    // Usar requestAnimationFrame para suavizar a animação
    requestAnimationFrame(() => {
      countdownBar.style.transition = `width ${durationTime}ms linear`;
      countdownBar.style.width = '100%';
    });
  }

  /**
   * Fecha todos os modais abertos
   */
  dismissAll(): void {
    // Limpar todos os temporizadores
    this.modalTimers.forEach((timerId, modalId) => {
      clearTimeout(timerId);
    });
    this.modalTimers.clear();

    // Encontra todos os elementos de modal ativos
    const modalElements = document.querySelectorAll('.modal.show');

    modalElements.forEach(element => {
      const modal = bootstrap.Modal.getInstance(element);
      if (modal) {
        modal.hide();
      }
    });
  }

  // Modal de Privacidade
  openPrivacyModal(): void {
    const modal = this.getBootstrapModal('privacyModal', true);
    if (modal) {
      modal.show();
    }
  }

  // Modal de Termos e Condições
  openTermsModal(): void {
    const modal = this.getBootstrapModal('termsModal', true);
    if (modal) {
      modal.show();
    }
  }

  // Modal de Cookies
  openCookiesModal(): void {
    const modal = this.getBootstrapModal('cookiesModal', true);
    if (modal) {
      modal.show();
    }
  }

  // Modal de Confirmação
  openConfirmationModal(title: string, message: string, confirmLabel?: string, cancelLabel?: string) {
    this.confirmationTitle = title;
    this.confirmationMessage = message;
    this.confirmButtonLabel = confirmLabel || 'Confirmar';
    this.cancelButtonLabel = cancelLabel || 'Cancelar';

    const modal = this.getBootstrapModal('confirmationModal', true);
    if (modal) {
      // Configurar evento para limpar o Subject quando o modal for fechado
      const modalElement = document.getElementById('confirmationModal');
      if (modalElement) {
        modalElement.addEventListener('hidden.bs.modal', () => {
          // Se o modal for fechado sem chamar confirmAction ou cancelAction, assume cancelamento
          if (this.confirmationResult.observers.length > 0) {
            this.confirmationResult.next(false);
          }
        }, { once: true });
      }

      modal.show();
    }

    return this.confirmationResult.asObservable();
  }

  confirmAction() {
    this.confirmationResult.next(true);
    this.dismissAll();
  }

  cancelAction() {
    this.confirmationResult.next(false);
    this.dismissAll();
  }

  // Modal de Erro
  openErrorModal(title: string, message: string, details?: string, showRetry: boolean = false, durationTime?: number) {
    this.errorTitle = title;
    this.errorMessage = message;
    this.errorDetails = details || '';
    this.showRetryButton = showRetry;

    const modal = this.getBootstrapModal('errorModal', true);
    if (modal) {
      modal.show();

      // Configurar fechamento automático se durationTime > 0
      if (durationTime && durationTime > 0) {
        this.setAutoCloseTimer('errorModal', durationTime);
      }
    }
  }

  retryErrorAction() {
    this.retryAction.next();
    this.clearAutoCloseTimer('errorModal');
    this.dismissAll();
  }

  // Modal de Warning
  openWarningModal(title: string, message: string, items?: string[], durationTime?: number) {
    this.warningTitle = title;
    this.warningMessage = message;
    this.warningItems = items || [];

    const modal = this.getBootstrapModal('warningModal', true);
    if (modal) {
      // Configurar evento para limpar o Subject quando o modal for fechado
      const modalElement = document.getElementById('warningModal');
      if (modalElement) {
        modalElement.addEventListener('hidden.bs.modal', () => {
          // Se o modal for fechado sem chamar proceedWarningAction ou cancelWarningAction, assume cancelamento
          if (this.warningResult.observers.length > 0) {
            this.warningResult.next(false);
          }
        }, { once: true });
      }

      modal.show();

      // Configurar fechamento automático se durationTime > 0
      if (durationTime && durationTime > 0) {
        this.setAutoCloseTimer('warningModal', durationTime);
      }
    }

    return this.warningResult.asObservable();
  }

  proceedWarningAction() {
    this.warningResult.next(true);
    this.clearAutoCloseTimer('warningModal');
    this.dismissAll();
  }

  cancelWarningAction() {
    this.warningResult.next(false);
    this.clearAutoCloseTimer('warningModal');
    this.dismissAll();
  }

  // Modal de Info
  openInfoModal(title: string, message: string, details?: string, durationTime?: number) {
    this.infoTitle = title;
    this.infoMessage = message;
    this.infoDetails = details || '';

    const modal = this.getBootstrapModal('infoModal', true);
    if (modal) {
      modal.show();

      // Configurar fechamento automático se durationTime > 0
      if (durationTime && durationTime > 0) {
        this.setAutoCloseTimer('infoModal', durationTime);
      }
    }
  }

  // Modal de Notificação
  openNotificationModal(type: 'success' | 'error' | 'info', title: string, message: string, durationTime: number = 5000) {
    this.notificationType = type;
    this.notificationTitle = title;
    this.notificationMessage = message;

    const modal = this.getBootstrapModal('notificationModal', false);
    if (modal) {
      modal.show();

      // Configurar fechamento automático
      this.setAutoCloseTimer('notificationModal', durationTime);
    }
  }
}