import { Component, Input } from '@angular/core';
import { ModalService } from '../../../../services/modal/modal.service';

@Component({
  selector: 'app-confirmation-modal',
  standalone: false,
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent {
  constructor(public modalService: ModalService) {}
}
