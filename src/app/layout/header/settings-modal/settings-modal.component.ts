import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ThemeService } from '../../../services/theme/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.css'],
  standalone: false
})
export class SettingsModalComponent implements OnInit, OnDestroy {
  @Input() isSettingsOpen: boolean = false;
  @Output() closeSettings = new EventEmitter<void>();

  isDarkMode: boolean = false;
  isHighContrast: boolean = false;
  availableBrands: { id: string, name: string }[] = [];
  selectedBrandId: string = '';
  
  private themeSubscription: Subscription | null = null;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.isDarkMode = this.themeService.getIsDarkMode();
    this.isHighContrast = this.themeService.getIsHighContrast();
    this.availableBrands = this.themeService.getAvailableBrands();
    this.selectedBrandId = this.themeService.getCurrentBrandId();
    
    // Inscrever-se para mudanças de tema
    this.themeSubscription = this.themeService.currentThemeMode.subscribe(mode => {
      this.isDarkMode = mode === 'dark';
      this.isHighContrast = mode === 'high-contrast';
    });
  }
  
  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  toggleDarkMode(checked: boolean) {
    if (checked) {
      this.isDarkMode = true;
      this.isHighContrast = false;
      this.themeService.toggleTheme('dark');
    } else {
      this.isDarkMode = false;
      this.themeService.toggleTheme('light');
    }
  }

  toggleHighContrast(checked: boolean) {
    if (checked) {
      this.isHighContrast = true;
      this.isDarkMode = false;
      this.themeService.toggleTheme('high-contrast');
    } else {
      this.isHighContrast = false;
      this.themeService.toggleTheme('light');
    }
  }
  
  changeBrand(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedBrandId = select.value;
    this.themeService.changeBrand(this.selectedBrandId);
  }

  close() {
    this.closeSettings.emit();
  }
}