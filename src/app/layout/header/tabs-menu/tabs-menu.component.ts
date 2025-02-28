import { Component, Input } from '@angular/core';
import { SettingsService } from '../../../services/settings/settings.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
selector: 'app-tabs-menu',
templateUrl: './tabs-menu.component.html',
styleUrls: ['./tabs-menu.component.css'],
standalone: false,
animations: [
trigger('slideInOut', [
transition(':enter', [
style({ transform: 'translateY(-20px)', opacity: 0 }),
animate('200ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
]),
transition(':leave', [
animate('200ms ease-in', style({ transform: 'translateY(-20px)', opacity: 0 }))
])
])
]
})
export class TabsMenuComponent {
@Input() tabs: any[] = [];
@Input() logoUrl: string | null = null;
@Input() isDarkMode: boolean = false;
@Input() isMenuOpen: boolean = false;
@Input() isMobile: boolean = false;

constructor(private settingsService: SettingsService) {
    // Detectar se está em um dispositivo móvel
    this.isMobile = window.innerWidth <= 768;
    
    // Adicionar listener para redimensionamento da janela
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768;
    });
  }

  getTexts() {
    return this.settingsService.getTexts().header;
  }

  handleAction(action: string | null) {
    if (action && typeof (this as any)[action] === 'function') {
      (this as any)[action]();
    }
  }
}