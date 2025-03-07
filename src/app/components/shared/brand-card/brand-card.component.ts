import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) { }

  onCardClick(): void {
    this.router.navigate(['/products'], { queryParams: { brand: this.brand.name } });
  }
}