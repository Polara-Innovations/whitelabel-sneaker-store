import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-section-title',
  standalone: false,
  templateUrl: './main-section-title.component.html',
  styleUrl: './main-section-title.component.css'
})
export class MainSectionTitleComponent {
 @Input() title: string = '';
 @Input() subtitle: string = '';

  constructor() { }
}
