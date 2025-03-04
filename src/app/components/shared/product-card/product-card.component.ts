import { Component, Input, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
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
  @Input() product?: Product;
  @Input() showDescription = false;

  // Permitir ajuste de largura externamente
  @HostBinding('style.width') width = '100%';
  @HostBinding('style.display') display = 'block';
  
  constructor(private router: Router) {}

  @Input()
  set ngStyle(styles: {[key: string]: any}) {
    if (styles && styles['width.px']) {
      this.width = `${styles['width.px']}px`;
    }
  }

  onCardClick(): void {
    this.router.navigate(['/product-details', this.product?.id]);
  }

  getFirstImageUrl(): string {
    if (!this.product || !this.product.imagesByColor) {
      console.error('Produto ou imagens não definidos:', this.product);
      return '';
    }
    
    const colorKeys = Object.keys(this.product.imagesByColor);
    if (colorKeys.length === 0) {
      console.error('Produto sem cores definidas:', this.product);
      return '';
    }
    
    const images = this.product.imagesByColor[colorKeys[0]];
    if (!images || images.length === 0) {
      console.error('Sem imagens para a cor:', colorKeys[0]);
      return '';
    }
    
    return images[0];
  }
}