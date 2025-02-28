import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../services/settings/settings.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss'],
  standalone: false
})
export class ContactInfoComponent implements OnInit {
  texts: any;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.texts = this.settingsService.getTexts().contact.info;
  }
}