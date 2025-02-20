import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() price!: number;
  @Input() imageUrl!: string;
  @Input() oldPrice?: number; 
  @Input() hasAction = true;
  @Input() actionLabel = 'Ver Detalhes';
  @Input() showTags = false;
  @Input() tags: string[] = []; 
  @Output() actionClick = new EventEmitter<void>();

  onActionClick(): void {
    this.actionClick.emit();
  }
}