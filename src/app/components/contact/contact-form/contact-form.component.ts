import { Component } from '@angular/core';
import { SettingsService } from '../../../services/settings/settings.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
  standalone: false
})
export class ContactFormComponent {
  texts: any;

  constructor(private settingsService: SettingsService) {
    this.texts = this.settingsService.getTexts().contact.form;
  }

  onSubmit() {
    alert('Mensagem enviada com sucesso!');
  }
}