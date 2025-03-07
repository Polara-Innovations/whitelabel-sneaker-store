import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal/modal.service';

@Component({
  selector: 'app-cookies-modal',
  templateUrl: './cookies-modal.component.html',
  styleUrls: ['./cookies-modal.component.css'],
  standalone: false
})
export class CookiesModalComponent {
  lastUpdated: string = new Date().toLocaleDateString();
  constructor(public modalService: ModalService) {}
}