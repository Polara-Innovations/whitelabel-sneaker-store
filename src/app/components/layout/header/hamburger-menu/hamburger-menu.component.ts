import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ThemeService } from '../../../../services/theme/theme.service';
import { NavCategory } from '../../../../models/nav-category.model';

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
  @Input() categories: NavCategory[] = [];
  @Input() tags: NavCategory[] = [];
  @Output() menuClosed = new EventEmitter<void>();

  constructor(private themeService: ThemeService) {}
  
  closeMenu() {
    this.menuClosed.emit();
  }
}