import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  standalone: false
})
export class ProductDetailsComponent {
  product: any;
  texts: any;
  relatedProducts: any[];

  constructor(private settingsService: SettingsService) {
    this.texts = this.settingsService.getTexts().productDetails;
    this.product = {
      name: 'Tênis Esportivo',
      description: 'Tênis confortável e estiloso, ideal para o dia a dia.',
      price: 'R$ 199,90',
      image: 'https://picsum.photos/400/300?random=1'
    };
    this.relatedProducts = [
      {
        name: 'Tênis Casual',
        price: 'R$ 249,90',
        image: 'https://picsum.photos/400/300?random=2'
      },
      {
        name: 'Tênis de Corrida',
        price: 'R$ 299,90',
        image: 'https://picsum.photos/400/300?random=3'
      },
      {
        name: 'Tênis Infantil',
        price: 'R$ 149,90',
        image: 'https://picsum.photos/400/300?random=4'
      },
      {
        name: 'Tênis Esportivo Pro',
        price: 'R$ 399,90',
        image: 'https://picsum.photos/400/300?random=5'
      }
    ];
  }
}