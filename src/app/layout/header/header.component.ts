import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings/settings.service';
import { ThemeService } from '../../services/theme/theme.service';

type MenuType = 'hamburger' | 'tabs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false
})
export class HeaderComponent {
  isDarkMode = false;
  isHamburgerMenu = false;
  tabs: any[] = [];
  logoUrl: string | null = null;

  constructor(private settingsService: SettingsService, private themeService: ThemeService) {
    const menuConfig = this.settingsService.getMenuConfig().header;
    this.isHamburgerMenu = menuConfig.type === 'hamburger';
    this.tabs = menuConfig.items;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  getIsDarkMode(): boolean {
    return this.themeService.getIsDarkMode();
  }
  }