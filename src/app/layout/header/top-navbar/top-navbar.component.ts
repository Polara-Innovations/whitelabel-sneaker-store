import { Component, Input } from '@angular/core';
import { SettingsService } from '../../../services/settings/settings.service';
import { ThemeService } from '../../../services/theme/theme.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css'],
  standalone: false
})
export class TopNavbarComponent {
  @Input() tabs: any[] = [];
  @Input() logoUrl: string | null = null;
  @Input() isDarkMode: boolean = false;
  isNavbarOpen = false;
  texts: any;

  constructor(private settingsService: SettingsService, private themeService: ThemeService) {
    this.texts = this.settingsService.getTexts().header;
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  getIsDarkMode(): boolean {
    return this.themeService.getIsDarkMode();
  }

  handleAction(action: string | null) {
    if (action && typeof (this as any)[action] === 'function') {
      (this as any)[action]();
    }
  }
}