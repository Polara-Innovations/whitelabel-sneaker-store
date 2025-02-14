import { Component } from '@angular/core';
import { SettingsService } from '../../../services/settings/settings.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  standalone: false
})
export class BannerComponent {
  texts: any;

  constructor(private settingsService: SettingsService) {
    this.texts = this.settingsService.getTexts().home.banner;
  }
}