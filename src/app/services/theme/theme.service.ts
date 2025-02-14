import { Injectable } from '@angular/core';
import { MOCK_COLORS } from '../../mocks/mock-colors';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkMode: boolean = false;

  constructor() {
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  getIsDarkMode(): boolean {
    return this.isDarkMode;
  }

  private applyTheme(): void {
    const theme = this.isDarkMode ? 'dark' : 'light';
    const colors = MOCK_COLORS[theme];

    Object.keys(colors).forEach((key) => {
      document.documentElement.style.setProperty(`--${key}-color`, colors[key as keyof typeof colors]);
    });

    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}