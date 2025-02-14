import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: false
})
export class ProductsComponent {
  texts: any;
  constructor(private settingsService: SettingsService) {
    this.texts = this.settingsService.getTexts().products;
  }
  products = [
    {
      id: 1,
      name: 'Tênis Esportivo',
      description: 'Conforto e estilo para o seu dia a dia.',
      price: 'R$ 199,90',
      image: 'https://picsum.photos/400/300?random=1'
    },
    {
      id: 2,
      name: 'Tênis Casual',
      description: 'Perfeito para qualquer ocasião.',
      price: 'R$ 249,90',
      image: 'https://picsum.photos/400/300?random=2'
    },
    {
      id: 3,
      name: 'Tênis de Corrida',
      description: 'Desempenho e leveza para suas corridas.',
      price: 'R$ 299,90',
      image: 'https://picsum.photos/400/300?random=3'
    }
  ];
}