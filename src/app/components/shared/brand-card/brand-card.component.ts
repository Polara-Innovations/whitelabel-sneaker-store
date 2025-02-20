import { Component, Input } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-brand-card',
  templateUrl: './brand-card.component.html',
  styleUrls: ['./brand-card.component.scss']
})
export class BrandCardComponent {
  @Input() name!: string;
  @Input() imageUrl!: string;
  @Input() actionLabel: string = 'Ver mais';

}