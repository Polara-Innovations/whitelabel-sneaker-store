import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../../services/modal/modal.service';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.css'],
  standalone: false
})
export class NotificationModalComponent implements OnInit {
  constructor(public modalService: ModalService) {}

  ngOnInit(): void {
    const modalElement = document.getElementById('notificationModal');
    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.modalService['clearAutoCloseTimer']('notificationModal');
      });
    }
  }
  
  close(): void {
    this.modalService['clearAutoCloseTimer']('notificationModal');
    
    const modalElement = document.getElementById('notificationModal');
    if (modalElement && typeof window !== 'undefined' && (window as any).bootstrap) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  getNotificationIcon(): string {
    switch (this.modalService.notificationType) {
      case 'success':
        return 'bi bi-check-circle-fill';
      case 'error':
        return 'bi bi-exclamation-triangle-fill';
      case 'info':
        return 'bi bi-info-circle-fill';
      default:
        return 'bi bi-info-circle-fill';
    }
  }

  getHeaderClass(): string {
    return `notification-header notification-header-${this.modalService.notificationType}`;
  }

  getModalClass(): string {
    return `notification-modal notification-modal-${this.modalService.notificationType}`;
  }
}