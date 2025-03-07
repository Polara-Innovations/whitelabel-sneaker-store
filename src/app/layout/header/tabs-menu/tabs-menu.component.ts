import { Component, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { NavCategory } from '../../../models/nav-category.model';

@Component({
  selector: 'app-tabs-menu',
  templateUrl: './tabs-menu.component.html',
  styleUrls: ['./tabs-menu.component.css'],
  standalone: false,
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-20px)', opacity: 0 }),
        animate('200ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-20px)', opacity: 0 }))
      ])
    ])
  ]
})
export class TabsMenuComponent {
  @Input() tabs: any[] = [];
  @Input() logoUrl: string | null = null;
  @Input() isDarkMode: boolean = false;
  @Input() isMenuOpen: boolean = false;
  @Input() isMobile: boolean = false;
  @Input() categories: NavCategory[] = [];
  @Input() tags: NavCategory[] = [];

  constructor() {
    this.isMobile = window.innerWidth <= 768;

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768;
    });
  }

  handleAction(action: string | null) {
    if (action && typeof (this as any)[action] === 'function') {
      (this as any)[action]();
    }
  }
}