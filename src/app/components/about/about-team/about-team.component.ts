import { Component } from '@angular/core';
import { SettingsService } from '../../../services/settings/settings.service';

@Component({
  selector: 'app-about-team',
  templateUrl: './about-team.component.html',
  styleUrls: ['./about-team.component.css'],
  standalone: false
})
export class AboutTeamComponent {

  texts: any
  teamMembers: any

  constructor(private settingsService: SettingsService) {
    this.texts = this.settingsService.getTexts().about.team;
    this.teamMembers = this.settingsService.getTexts().about.team.members;
  }
}