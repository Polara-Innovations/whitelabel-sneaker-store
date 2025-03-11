import { Component } from '@angular/core';
import { ModalService } from '../../../../services/modal/modal.service';

@Component({
  selector: 'app-modals-container',
  templateUrl: './modals-container.component.html',
  styleUrls: ['./modals-container.component.css'],
  standalone: false
})
export class ModalsContainerComponent {
  constructor(public modalService: ModalService) {}
}