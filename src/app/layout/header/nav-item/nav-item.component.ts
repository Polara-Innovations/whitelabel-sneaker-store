import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tab } from '../../../models/tab.model';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.css'],
  standalone: false
})
export class NavItemComponent {
  @Input() tab: Tab = { name: '', route: '', icon: '', display: '' };
  @Input() isActive: boolean = false;
  @Input() vertical: boolean = false; // Nova propriedade adicionada
  @Output() navClick = new EventEmitter<void>();
  
  onClick(event?: Event) {
    if (event) {
      if (this.tab.route === '#' || !this.tab.route) {
        event.preventDefault();
      }
    }
    this.navClick.emit();
  }
}