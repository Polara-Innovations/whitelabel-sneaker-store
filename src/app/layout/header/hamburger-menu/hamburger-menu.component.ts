import { Component, Input } from '@angular/core';
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
  @Input() brandName: string = 'Sneaker Store';
  @Input() customBackground: string = 'var(--background-secondary-color)';
  isMenuOpen = false;

  constructor(private themeService: ThemeService) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  getIsDarkMode(): boolean {
    return this.themeService.getIsDarkMode();
  }
}