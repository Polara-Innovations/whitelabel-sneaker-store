import { Component } from '@angular/core';
import { SettingsService } from '../../../services/settings/settings.service';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css'],
  standalone: false
})
export class FeaturedProductsComponent {
  texts: any;
  constructor(private settingsService: SettingsService) {
    this.texts = this.settingsService.getTexts().home.featuredProducts;
  }
  featuredProducts = [
    {
      name: 'Tênis Esportivo',
      description: 'Conforto e estilo para o seu dia a dia.',
      image: 'https://picsum.photos/400/300?random=1'
    },
    {
      name: 'Tênis Casual',
      description: 'Perfeito para qualquer ocasião.',
      image: 'https://picsum.photos/400/300?random=2'
    },
    {
      name: 'Tênis de Corrida',
      description: 'Desempenho e leveza para suas corridas.',
      image: 'https://picsum.photos/400/300?random=3'
    }
  ];
}