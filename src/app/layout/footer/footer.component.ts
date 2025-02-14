import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  standalone: false,  
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  texts: any

  constructor(private settingsService: SettingsService) {
    this.texts = this.settingsService.getTexts().footer;
  }

}
