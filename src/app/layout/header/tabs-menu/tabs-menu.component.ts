import { Component, Input } from '@angular/core';
import { SettingsService } from '../../../services/settings/settings.service';

@Component({
  selector: 'app-tabs-menu',
  templateUrl: './tabs-menu.component.html',
  styleUrls: ['./tabs-menu.component.css'],
  standalone: false
})
export class TabsMenuComponent {
  @Input() tabs: any[] = [];
  @Input() logoUrl: string | null = null;
  @Input() isDarkMode: boolean = false;
  @Input() isMenuOpen: boolean = false;

  constructor(private settingsService: SettingsService) {}

  getTexts() {
    return this.settingsService.getTexts().header;
  }

  handleAction(action: string | null) {
    if (action && typeof (this as any)[action] === 'function') {
      (this as any)[action]();
    }
  }
}