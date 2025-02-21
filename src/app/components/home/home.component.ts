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
  id: 1,
  title: 'Tênis Nike Air Max',
  description: 'Confortável e estiloso',
  price: 399.99,
  imageUrl: 'https://picsum.photos/400/300?random=1',
  tags: ['calçado', 'esporte', 'nike']
},
{
  id: 2,
  title: 'Tênis Adidas Ultraboost',
  description: 'Alta performance para corrida e treino',
  oldPrice: 599.99,
  price: 499.99,
  imageUrl: 'https://picsum.photos/400/300?random=2',
  tags: ['calçado', 'esporte', 'adidas']
},
{
  id: 3,
  title: 'Tênis Puma Ignite',
  description: 'Leve e confortável',
  price: 349.99,
  imageUrl: 'https://picsum.photos/400/300?random=3',
  tags: ['calçado', 'esporte', 'puma']
},
{
  id: 4,
  title: 'Tênis Asics Gel-Kayano',
  description: 'Estabilidade e suporte',
  price: 599.99,
  imageUrl: 'https://picsum.photos/400/300?random=4',
  tags: ['calçado', 'esporte', 'asics']
},
{
  id: 5,
  title: 'Tênis Mizuno Wave',
  description: 'Amortecimento e durabilidade',
  oldPrice: 549.99,
  price: 449.99,
  imageUrl: 'https://picsum.photos/400/300?random=5',
  tags: ['calçado', 'esporte', 'mizuno']
},
{
  id: 6,
  title: 'Tênis Reebok Nano',
  description: 'Desempenho para crossfit',
  price: 399.99,
  imageUrl: 'https://picsum.photos/400/300?random=6',
  tags: ['calçado', 'esporte', 'reebok']
},
{
  id: 7,
  title: 'Tênis New Balance 1080',
  description: 'Conforto e estilo',
  price: 499.99,
  imageUrl: 'https://picsum.photos/400/300?random=7',
  tags: ['calçado', 'esporte', 'new balance']
},
{
  id: 8,
  title: 'Tênis Under Armour HOVR',
  description: 'Tecnologia de amortecimento',
  oldPrice: 649.99,
  price: 549.99,
  imageUrl: 'https://picsum.photos/400/300?random=8',
  tags: ['calçado', 'esporte', 'under armour']
},
{
  id: 9,
  title: 'Tênis Fila Disruptor',
  description: 'Design robusto',
  price: 299.99,
  imageUrl: 'https://picsum.photos/400/300?random=9',
  tags: ['calçado', 'esporte', 'fila']
},
{
  id: 10,
  title: 'Tênis Converse All Star',
  description: 'Clássico e versátil',
  price: 199.99,
  imageUrl: 'https://picsum.photos/400/300?random=10',
  tags: ['calçado', 'casual', 'converse']
},
{
  id: 11,
  title: 'Tênis Vans Old Skool',
  description: 'Estilo skatista',
  oldPrice: 349.99,
  price: 249.99,
  imageUrl: 'https://picsum.photos/400/300?random=11',
  tags: ['calçado', 'casual', 'vans']
},
{
  id: 12,
  title: 'Tênis Skechers Go Walk',
  description: 'Conforto para caminhada',
  price: 279.99,
  imageUrl: 'https://picsum.photos/400/300?random=12',
  tags: ['calçado', 'casual', 'skechers']
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