import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings/settings.service';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false
})
export class HeaderComponent {
  isDarkMode = false;
  isHamburgerMenu = false;
  isMobile = false;
  tabs: any[] = [];
  logoUrl: string | null = null;
  isMenuOpen = false;
  brandName: string = 'Sneaker Store';
  isSettingsOpen = false 
  isCartOpen = false;
  isProfileOpen = false;

  constructor(private settingsService: SettingsService) {
    const menuConfig = this.settingsService.getMenuConfig().header;
    this.isHamburgerMenu = menuConfig.type === 'hamburger';
    this.tabs = menuConfig.items;
    this.logoUrl = this.settingsService.getLogoUrl();
  }

  ngOnInit() {
    this.checkIfMobile();
    window.addEventListener('resize', this.checkIfMobile.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.checkIfMobile.bind(this));
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}