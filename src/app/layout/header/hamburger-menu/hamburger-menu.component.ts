import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ThemeService } from '../../../services/theme/theme.service';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.css'],
  standalone: false
})
export class HamburgerMenuComponent {
  @Input() tabs: any[] = [];
  @Input() logoUrl: string | null = null;
  @Input() isMenuOpen = false;
  @Output() menuClosed = new EventEmitter<void>();

  constructor(private themeService: ThemeService) {}
  
  closeMenu() {
    this.menuClosed.emit();
  }
}