import { Injectable } from '@angular/core';
import { MOCK_COLORS } from '../../mocks/mock-colors';

type Theme = 'light' | 'dark' | 'high-contrast';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme: Theme;

  constructor() {
    this.theme = localStorage.getItem('theme') as Theme;
    this.applyTheme();
  }

  toggleTheme(theme: Theme): void {
    localStorage.setItem('theme', theme);
    this.applyTheme();
  }

  getIsDarkMode(): boolean {
    return this.theme === 'dark';
  }

  getIsHighContrast(): boolean {
    return this.theme === 'high-contrast';
  }

  private applyTheme(): void { }
}