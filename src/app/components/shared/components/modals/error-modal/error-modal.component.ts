import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../../../../services/modal/modal.service';

@Component({
  selector: 'app-error-modal',
  standalone: false,
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.css'
})
export class ErrorModalComponent implements OnInit{
  constructor(public modalService: ModalService) {}

  ngOnInit(): void {
    const modalElement = document.getElementById('infoModal');
    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.modalService['clearAutoCloseTimer']('infoModal');
      });
    }
  }
  
  close(): void {
    this.modalService['clearAutoCloseTimer']('infoModal');
    
    const modalElement = document.getElementById('infoModal');
    if (modalElement && typeof window !== 'undefined' && (window as any).bootstrap) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }
}
