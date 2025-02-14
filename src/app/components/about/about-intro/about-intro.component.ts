import { Component } from '@angular/core';
import { SettingsService } from '../../../services/settings/settings.service';

@Component({
  selector: 'app-about-intro',
  templateUrl: './about-intro.component.html',
  styleUrls: ['./about-intro.component.css'],
  standalone: false
})
export class AboutIntroComponent {
  texts: any;

  constructor(private settingsService: SettingsService) {
    this.texts = this.settingsService.getTexts().about.intro;
  }
}