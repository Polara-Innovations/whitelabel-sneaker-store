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
  @Output() navClick = new EventEmitter<void>();
  
  onClick() {
    this.navClick.emit();
  }
}