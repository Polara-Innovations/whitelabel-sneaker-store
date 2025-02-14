import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.css'],
  standalone: false
})
export class RelatedProductsComponent {
  @Input() relatedProducts: any[] = [];
  @Input() title: string = '';
}