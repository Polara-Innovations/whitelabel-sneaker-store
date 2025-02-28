import { Component, Input } from '@angular/core';
import { ThemeService } from '../../../services/theme/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.css'],
  standalone: false
})
export class SettingsModalComponent {
  @Input() isSettingsOpen: boolean = true;

  isDarkMode: boolean = false;
  isHighContrast: boolean = false;

  constructor(private themeService: ThemeService) {
    this.isDarkMode = this.themeService.getIsDarkMode();
    this.isHighContrast = this.themeService.getIsHighContrast();
  }

  toggleDarkMode(checked: boolean) {
    this.isDarkMode = checked;
    this.isHighContrast = false; 
    this.themeService.toggleTheme('dark'); 
  }

  toggleHighContrast(checked: boolean) {
    this.isHighContrast = checked;
    this.isDarkMode = false; 
    this.themeService.toggleTheme('high-contrast');
  }
}