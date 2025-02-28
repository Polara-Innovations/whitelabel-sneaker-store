import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings/settings.service';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: false
})
export class ContactComponent implements OnInit {
  texts: any;

  constructor(
    private settingsService: SettingsService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.texts = this.settingsService.getTexts().contact;
  }
}