import { Component } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent {
  featuredProducts: Product[] = [
    {
      id: 1,
      title: 'Tênis Nike Air Max',
      description: 'Confortável e estiloso',
      price: 399.99,
      tags: ['calçado', 'esporte', 'nike'],
      imagesByColor: {
        'red': [
          'https://picsum.photos/400/300?random=1',
          'https://picsum.photos/400/300?random=2'
        ],
        'blue': [
          'https://picsum.photos/400/300?random=3',
          'https://picsum.photos/400/300?random=4'
        ]
      },
      inStock: true,
      stockQuantity: 10,
      colors: ['red', 'blue'],
      sizes: ['38', '39', '40'],
      categories: ['footwear'],
      createdAt: new Date(),
    },
    {
      id: 2,
      title: 'Tênis Adidas Ultraboost',
      description: 'Alta performance para corrida e treino',
      oldPrice: 599.99,
      price: 499.99,
      tags: ['calçado', 'esporte', 'adidas'],
      imagesByColor: {
        'black': [
          'https://picsum.photos/400/300?random=5',
          'https://picsum.photos/400/300?random=6'
        ],
        'white': [
          'https://picsum.photos/400/300?random=7',
          'https://picsum.photos/400/300?random=8'
        ]
      },
      inStock: true,
      sizes: ['40', '41', '42'],
      categories: ['footwear'],
      createdAt: new Date(),
      stockQuantity: 15,
      colors: ['black', 'white'],
    },
    {
      id: 3,
      title: 'Tênis Puma Ignite',
      description: 'Leve e confortável',
      price: 349.99,
      tags: ['calçado', 'esporte', 'puma'],
      imagesByColor: {
        'green': [
          'https://picsum.photos/400/300?random=9',
          'https://picsum.photos/400/300?random=10'
        ],
        'yellow': [
          'https://picsum.photos/400/300?random=11',
          'https://picsum.photos/400/300?random=12'
        ]
      },
      sizes: ['39', '40', '41'],
      categories: ['footwear'],
      createdAt: new Date(),
      inStock: true,
      stockQuantity: 10,
      colors: ['green', 'yellow'],
    }
  ];

  promotionalProducts = [
    {
      title: 'Smartphone Samsung Galaxy A71',
      description: '128GB, Tela 6.7", Preto',
      price: 1999.99,
      imageUrl: 'https://picsum.photos/400/300?random=5'
    },
    {
      title: 'Smartphone Xiaomi Redmi Note 9',
      description: '64GB, Tela 6.53", Cinza',
      imageUrl: 'https://picsum.photos/400/300?random=6'
    },
    {
      title: 'Smartphone Motorola Moto G9 Play',
      description: '64GB, Tela 6.5", Azul',
      price: 999.99,
      imageUrl: 'https://picsum.photos/400/300?random=7'
    },
    {
      title: 'Smartphone Samsung Galaxy A01',
      description: '32GB, Tela 5.7", Preto',
      imageUrl: 'https://picsum.photos/400/300?random=8'
    }
  ];

  brands = [
    {
      name: 'Samsung',
      imageUrl: 'https://picsum.photos/400/300?random=13'
    },
    {
      name: 'Apple',
      imageUrl: 'https://picsum.photos/400/300?random=14'
    },
    {
      name: 'Motorola',
      imageUrl: 'https://picsum.photos/400/300?random=15'
    },
    {
      name: 'Xiaomi',
      imageUrl: 'https://picsum.photos/400/300?random=16'
    },
    {
      name: 'Sony',
      imageUrl: 'https://picsum.photos/400/300?random=17'
    },
    {
      name: 'OnePlus',
      imageUrl: 'https://picsum.photos/400/300?random=18'
    },
    {
      name: 'Google',
      imageUrl: 'https://picsum.photos/400/300?random=19'
    }
  ];

  categories = [
    { name: 'Roupas', imageUrl: 'https://picsum.photos/400/300?random=19', route: '/roupas' },
    { name: 'Calçados', imageUrl: 'https://picsum.photos/400/300?random=20', route: '/calcados' },
    { name: 'Acessórios', imageUrl: 'https://picsum.photos/400/300?random=21', route: '/acessorios' },
    { name: 'Eletrônicos', imageUrl: 'https://picsum.photos/400/300?random=22', route: '/eletronicos' }
  ];

  banners = [
    { imageUrl: 'https://picsum.photos/400/300?random=22', route: '/route1' },
    { imageUrl: 'https://picsum.photos/400/300?random=22', route: '/route2' },
    { imageUrl: 'https://picsum.photos/400/300?random=22', route: '/route3' }
  ];
}
