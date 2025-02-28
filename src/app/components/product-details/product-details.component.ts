import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, HostListener } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Product } from "../../models/product.model";

interface ZoomPosition {
  x: number;
  y: number;
}

@Component({
  standalone: false,
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"],
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {
  @Output() addToCartEvent = new EventEmitter<{productId: number, color: string, size: string}>();
  @ViewChild('mainImage') mainImageElement!: ElementRef;
  @ViewChild('mainImageContainer') mainImageContainer!: ElementRef;
  @ViewChild('thumbnailsContainer') thumbnailsContainer!: ElementRef;

  product!: Product;
  filteredSizes: string[] = [];
  selectedColor: string = '';
  selectedSize: string = '';
  isInWishlist: boolean = false;
  currentImage: string = '';
  currentColorImages: string[] = [];
  
  // Zoom properties
  isZooming: boolean = false;
  zoomPosition: ZoomPosition = { x: 0, y: 0 };
  
  // Thumbnails scrolling
  thumbnailScrollPosition: number = 0;
  maxScrollPosition: number = 0;
  thumbnailWidth: number = 80;
  thumbnailGap: number = 8;
  visibleThumbnails: number = 4;

  // Color mapping for display names
  colorNames: {[code: string]: string} = {
    '#ff0000': 'Vermelho',
    '#00ff00': 'Verde',
    '#0000ff': 'Azul',
    '#ff00ff': 'Rosa',
    '#ffff00': 'Amarelo',
    '#00ffff': 'Ciano',
    '#000000': 'Preto',
    '#ffffff': 'Branco'
  };

  relatedProducts: Product[] = [];

  constructor(private route: ActivatedRoute) { }

  @HostListener('window:resize')
  onResize() {
    this.calculateMaxScrollPosition();
  }

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchProduct(productId);
    this.fetchRelatedProducts();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.calculateMaxScrollPosition();
    }, 100);
  }

  fetchProduct(id: number): void {
    // Simulando dados de produto
    this.product = {
      id: id,
      title: 'Product Title',
      description: 'This is a detailed description of the product. It highlights features and benefits.',
      oldPrice: 100,
      price: 80,
      imagesByColor: {
        '#ff0000': [
          'https://picsum.photos/800/600?random=1',
          'https://picsum.photos/800/600?random=2',
          'https://picsum.photos/800/600?random=3',
          'https://picsum.photos/800/600?random=4',
          'https://picsum.photos/800/600?random=5',
        ],
        '#00ff00': [
          'https://picsum.photos/800/600?random=6',
          'https://picsum.photos/800/600?random=7',
          'https://picsum.photos/800/600?random=8',
        ],
        '#0000ff': [
          'https://picsum.photos/800/600?random=9',
          'https://picsum.photos/800/600?random=10',
          'https://picsum.photos/800/600?random=11',
        ]
      },
      tags: ['tag1', 'tag2', 'tag3'],
      inStock: true,
      stockQuantity: 10,
      colors: ['#ff0000', '#00ff00', '#0000ff'],
      sizes: ['S', 'M', 'L', 'XL']
    };
    
    // Inicializa com a primeira cor e imagem
    this.selectColor(this.product.colors[0]);
    this.filteredSizes = this.product.sizes || [];
  }

  fetchRelatedProducts(): void {
    // Estrutura simplificada para exemplo
    this.relatedProducts = [
      {
        id: 2,
        title: 'Related Product 1',
        description: 'Description for related product 1.',
        oldPrice: 120,
        price: 90,
        imagesByColor: {
          '#ff0000': ['https://picsum.photos/800/600?random=11']
        },
        tags: ['tag1', 'tag4'],
        inStock: true,
        stockQuantity: 5,
        colors: ['#ff0000'],
        sizes: ['M', 'L']
      },
      {
        id: 3,
        title: 'Related Product 2',
        description: 'Description for related product 2.',
        oldPrice: 150,
        price: 110,
        imagesByColor: {
          '#0000ff': ['https://picsum.photos/400/300?random=13']
        },
        tags: ['tag2', 'tag5'],
        inStock: true,
        stockQuantity: 8,
        colors: ['#0000ff'],
        sizes: ['S', 'XL']
      }
    ];
  }

  selectColor(color: string): void {
    this.selectedColor = color;
    this.currentColorImages = this.product.imagesByColor[color] || [];
    this.currentImage = this.currentColorImages[0] || '';
    this.thumbnailScrollPosition = 0;
    
    setTimeout(() => {
      this.calculateMaxScrollPosition();
    }, 0);
  }

  selectImage(image: string): void {
    this.currentImage = image;
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  getColorName(colorCode: string): string {
    return this.colorNames[colorCode] || colorCode;
  }

  onFilterSizes(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value;
    this.filterSizes(query);
  }

  onSizeSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectSize(selectElement.value);
  }

  filterSizes(query: string): void {
    this.filteredSizes = this.product?.sizes?.filter(size =>
      size.toLowerCase().includes(query.toLowerCase())
    ) || [];
  }

  addToCart(): void {
    if (this.selectedSize && this.selectedColor) {
      this.addToCartEvent.emit({
        productId: this.product.id,
        color: this.selectedColor,
        size: this.selectedSize
      });
    }
  }

  toggleWishlist(): void {
    this.isInWishlist = !this.isInWishlist;
    // Implementar lógica para adicionar/remover da lista de desejos
  }

  // Zoom functionality
  showZoom(): void {
    this.isZooming = true;
  }

  handleZoom(event: MouseEvent): void {
    if (!this.mainImageElement || !this.isZooming) return;
    
    const img = this.mainImageElement.nativeElement;
    const rect = img.getBoundingClientRect();
    
    // Calculate position for the lens
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Ajuste para centralizar a lente no cursor
    const lensSize = 100; // Tamanho da lente
    
    this.zoomPosition = {
      x: Math.max(0, Math.min(x - lensSize/2, rect.width - lensSize)),
      y: Math.max(0, Math.min(y - lensSize/2, rect.height - lensSize))
    };
  }

  hideZoom(): void {
    this.isZooming = false;
  }

  // Thumbnails navigation
  scrollThumbnails(direction: 'prev' | 'next'): void {
    const scrollAmount = this.thumbnailWidth + this.thumbnailGap;
    
    if (direction === 'prev') {
      this.thumbnailScrollPosition = Math.max(0, this.thumbnailScrollPosition - scrollAmount);
    } else {
      this.thumbnailScrollPosition = Math.min(
        this.maxScrollPosition,
        this.thumbnailScrollPosition + scrollAmount
      );
    }
  }

  calculateMaxScrollPosition(): void {
    if (!this.thumbnailsContainer || !this.currentColorImages || this.currentColorImages.length === 0) return;
    
    const containerWidth = this.thumbnailsContainer.nativeElement.offsetWidth;
    const totalWidth = this.currentColorImages.length * (this.thumbnailWidth + this.thumbnailGap);
    
    this.maxScrollPosition = Math.max(0, totalWidth - containerWidth);
    
    this.visibleThumbnails = Math.floor(containerWidth / (this.thumbnailWidth + this.thumbnailGap));
  }
}