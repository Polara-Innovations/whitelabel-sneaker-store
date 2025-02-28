// brand-card.component.ts
import { Component, Input, HostBinding } from '@angular/core';

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
  
  @Input() cardWidth: number = 150;
  
  @HostBinding('style.width.px') get width() {
    return this.cardWidth;
  }
  
  @HostBinding('style.height.px') get height() {
    return this.cardWidth; // Mantém o aspecto quadrado
  }
  
  @HostBinding('style.display') display = 'block';
}