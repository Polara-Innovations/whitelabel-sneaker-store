import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Product } from "../../models/product.model";

@Component({
  standalone: false,
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"],
})
export class ProductDetailsComponent implements OnInit {
  @Output() addToCartEvent = new EventEmitter<number>();

  product!: Product;
  relatedProducts: Product[] = [
    {
      id: 2,
      title: 'Related Product 1',
      description: 'Description for related product 1.',
      oldPrice: 120,
      price: 90,
      images: ['https://picsum.photos/400/300?random=5'],
      tags: ['tag1', 'tag4'],
      inStock: true,
      stockQuantity: 5,
      colors: ['#ff0000', '#00ff00'],
      sizes: ['M', 'L']
    },
    {
      id: 3,
      title: 'Related Product 2',
      description: 'Description for related product 2.',
      oldPrice: 150,
      price: 110,
      images: ['https://picsum.photos/400/300?random=6'],
      tags: ['tag2', 'tag5'],
      inStock: true,
      stockQuantity: 8,
      colors: ['#0000ff', '#ff00ff'],
      sizes: ['S', 'XL']
    },
    {
      id: 4,
      title: 'Related Product 3',
      description: 'Description for related product 3.',
      oldPrice: 130,
      price: 100,
      images: ['https://picsum.photos/400/300?random=7'],
      tags: ['tag3', 'tag6'],
      inStock: true,
      stockQuantity: 12,
      colors: ['#00ff00', '#0000ff'],
      sizes: ['M', 'L', 'XL']
    },
    {
      id: 5,
      title: 'Related Product 4',
      description: 'Description for related product 4.',
      oldPrice: 140,
      price: 105,
      images: ['https://picsum.photos/400/300?random=8'],
      tags: ['tag1', 'tag7'],
      inStock: true,
      stockQuantity: 7,
      colors: ['#ff0000', '#ff00ff'],
      sizes: ['S', 'M']
    },
    {
      id: 6,
      title: 'Related Product 5',
      description: 'Description for related product 5.',
      oldPrice: 160,
      price: 120,
      images: ['https://picsum.photos/400/300?random=9'],
      tags: ['tag2', 'tag8'],
      inStock: true,
      stockQuantity: 9,
      colors: ['#00ff00', '#0000ff'],
      sizes: ['L', 'XL']
    },
    {
      id: 7,
      title: 'Related Product 6',
      description: 'Description for related product 6.',
      oldPrice: 110,
      price: 85,
      images: ['https://picsum.photos/400/300?random=10'],
      tags: ['tag3', 'tag9'],
      inStock: true,
      stockQuantity: 6,
      colors: ['#ff0000', '#00ff00'],
      sizes: ['S', 'M', 'L']
    },
    {
      id: 8,
      title: 'Related Product 7',
      description: 'Description for related product 7.',
      oldPrice: 170,
      price: 130,
      images: ['https://picsum.photos/400/300?random=11'],
      tags: ['tag1', 'tag10'],
      inStock: true,
      stockQuantity: 10,
      colors: ['#0000ff', '#ff00ff'],
      sizes: ['M', 'L', 'XL']
    },
    {
      id: 9,
      title: 'Related Product 8',
      description: 'Description for related product 8.',
      oldPrice: 180,
      price: 140,
      images: ['https://picsum.photos/400/300?random=12'],
      tags: ['tag2', 'tag11'],
      inStock: true,
      stockQuantity: 4,
      colors: ['#ff0000', '#00ff00'],
      sizes: ['S', 'M']
    }
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchProduct(productId);
  }

  fetchProduct(id: number): void {
    this.product = {
      id: id,
      title: 'Product Title',
      description: 'This is a detailed description of the product. It highlights features and benefits.',
      oldPrice: 100,
      price: 80,
      images: [
        'https://picsum.photos/400/300?random=1',
        'https://picsum.photos/400/300?random=2',
        'https://picsum.photos/400/300?random=3',
        'https://picsum.photos/400/300?random=4'
      ],
      tags: ['tag1', 'tag2', 'tag3'],
      inStock: true,
      stockQuantity: 10,
      colors: ['#ff0000', '#00ff00', '#0000ff'], // Cores disponíveis
      sizes: ['S', 'M', 'L', 'XL'] // Tamanhos disponíveis
    };
  }


  addToCart(): void {
    this.addToCartEvent.emit(this.product.id);
  }

  toggleWishlist(): void {
    // Implementar lógica para adicionar/remover da lista de desejos
  }

  selectImage(image: string): void {
    // Implementar lógica para selecionar imagem
  }

  selectColor(color: string): void {
    // Implementar lógica para selecionar cor
  }

  selectSize(size: string): void {
    // Implementar lógica para selecionar tamanho
  }
}