import { Component } from '@angular/core';
import { ModalService } from '../../../../../services/modal/modal.service';

@Component({
  selector: 'app-privacy-modal',
  standalone: false,
  templateUrl: './privacy-modal.component.html',
  styleUrl: './privacy-modal.component.css'
})
export class PrivacyModalComponent {
  lastUpdated: string = new Date().toLocaleDateString();
  constructor(public modalService: ModalService) {}
}
