import { Component, Input } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router para navegação
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() actionLabel: string = 'Ver Detalhes'; 
  @Input() showTags = false;
  @Input() showAction = false;
  @Input() product?: Product
  @Input() showDescription = false;

  constructor(private router: Router) {}

  onCardClick(): void {
    this.router.navigate(['/product-details', this.product?.id]);
  }

  getFirstImageUrl(): string {
    return this.product?.imagesByColor[Object.keys(this.product.imagesByColor)[0]][0] || '';
  }
}