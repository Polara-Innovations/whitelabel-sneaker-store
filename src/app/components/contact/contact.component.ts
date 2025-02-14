import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: false
})
export class ContactComponent {
  texts: any;

  constructor(private settingsService: SettingsService) {
    this.texts = this.settingsService.getTexts().contact;
  }
}