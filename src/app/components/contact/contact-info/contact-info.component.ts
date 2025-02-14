import { Component } from '@angular/core';
import { SettingsService } from '../../../services/settings/settings.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css'],
  standalone: false
})
export class ContactInfoComponent {
  texts: any;

  constructor(private settingsService: SettingsService) {
    this.texts = this.settingsService.getTexts().contact.info;
  }
}