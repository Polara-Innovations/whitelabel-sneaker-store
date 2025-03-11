import { Component } from '@angular/core';
import { ModalService } from '../../../../../services/modal/modal.service';

@Component({
  selector: 'app-terms-modal',
  standalone: false,
  templateUrl: './terms-modal.component.html',
  styleUrl: './terms-modal.component.css'
})
export class TermsModalComponent {
  lastUpdated: string = new Date().toLocaleDateString();
  constructor(public modalService: ModalService) {}
}
