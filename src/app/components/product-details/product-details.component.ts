import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  @Input() product!: Product; // Recebe um produto

  onActionClick() {
    // Implemente a ação ao clicar no botão
    console.log('Clicou no botão!');
  }
}