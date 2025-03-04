// brand-card.component.ts
import { Component, Input, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { Brand } from '../../../models/brand.model';

@Component({
  standalone: false,
  selector: 'app-brand-card',
  templateUrl: './brand-card.component.html',
  styleUrls: ['./brand-card.component.scss']
})
export class BrandCardComponent {
  @Input() brand!: Brand;
  @Input() actionLabel: string = 'Ver mais';

  @Input() cardWidth: number = 150;

  @HostBinding('style.width.px') get width() {
    return this.cardWidth;
  }

  @HostBinding('style.height.px') get height() {
    return this.cardWidth; 
  }

  @HostBinding('style.display') display = 'block';

  constructor(private router: Router) { }

  onCardClick(): void {
    this.router.navigate(['/products'], { queryParams: { brand: this.brand.name } });
  }
}