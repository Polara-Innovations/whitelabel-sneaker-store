import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent {
  featuredProducts = [
    {
      title: 'Smartphone Samsung Galaxy A71',
      description: '128GB, Tela 6.7", Preto',
      oldPrice: 2199.99,
      price: 1999.99,
      imageUrl: 'https://picsum.photos/400/300?random=1'
    },
    {
      title: 'Smartphone Xiaomi Redmi Note 9',
      description: '64GB, Tela 6.53", Cinza',
      price: 1399.99,
      imageUrl: 'https://picsum.photos/400/300?random=2'
    },
    {
      title: 'Smartphone Motorola Moto G9 Play',
      description: '64GB, Tela 6.5", Azul',
      price: 999.99,
      imageUrl: 'https://picsum.photos/400/300?random=3'
    },
    {
      title: 'Smartphone Samsung Galaxy A01',
      description: '32GB, Tela 5.7", Preto',
      price: 699.99,
      imageUrl: 'https://picsum.photos/400/300?random=4'
    }, 
    {
      title: 'Smartphone Apple iPhone 12',
      description: '64GB, Tela 6.1", Branco',
      price: 4999.99,
      imageUrl: 'https://picsum.photos/400/300?random=9'
    },
    {
      title: 'Smartphone Google Pixel 5',
      description: '128GB, Tela 6.0", Verde',
      price: 3999.99,
      imageUrl: 'https://picsum.photos/400/300?random=10'
    },
    {
      title: 'Smartphone OnePlus 8T',
      description: '128GB, Tela 6.55", Prata',
      price: 2999.99,
      imageUrl: 'https://picsum.photos/400/300?random=11'
    },
    {
      title: 'Smartphone Sony Xperia 5 II',
      description: '128GB, Tela 6.1", Preto',
      price: 3499.99,
      imageUrl: 'https://picsum.photos/400/300?random=12'
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
      price: 1399.99,
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
      price: 699.99,
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
  ]

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