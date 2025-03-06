import { Component, Input } from '@angular/core';
import { MissionVisionValues } from '../../../models/about-us.model';

@Component({
  selector: 'app-mission-vision-values',
  templateUrl: './mission-vision-values.component.html',
  styleUrls: ['./mission-vision-values.component.css'],
  standalone: false
})
export class MissionVisionValuesComponent {
  @Input() data: MissionVisionValues | null = null;
}