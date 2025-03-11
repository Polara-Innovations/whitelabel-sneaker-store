import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../../services/modal/modal.service';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.css'],
  standalone: false
})
export class InfoModalComponent implements OnInit {
  
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
