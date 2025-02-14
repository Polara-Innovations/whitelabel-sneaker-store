import { Injectable } from '@angular/core';
import { MOCK_TEXTS } from '../../mocks/mock-texts';
import { MOCK_IMAGES } from '../../mocks/mock-images';
import { MOCK_MENU } from '../../mocks/mock_menu';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor() {}

  getTexts() {
    return MOCK_TEXTS;
  }

  getImages() {
    return MOCK_IMAGES;
  }

  getHeaderTabs() {
    return [
      { name: 'Home', route: '/' },
      { name: 'Produtos', route: '/products' },
      { name: 'Sobre', route: '/about' },
      { name: 'Contato', route: '/contact' }
    ];
  }

  getMenuConfig() {
    return MOCK_MENU;
  }
}