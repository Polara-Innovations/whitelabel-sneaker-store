import { Component, Input } from '@angular/core';
import { ContentSection } from '../../../models/about-us.model';

@Component({
  selector: 'app-content-sections',
  templateUrl: './content-sections.component.html',
  styleUrls: ['./content-sections.component.css'],
  standalone: false
})
export class ContentSectionsComponent {
  @Input() sections: ContentSection[] = [];
}