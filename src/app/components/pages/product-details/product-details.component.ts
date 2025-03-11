import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "../../../models/product.model";
import { CartService } from "../../../services/cart/cart.service";
import { ProductsService } from "../../../services/api/products/products.service";
import { ModalService } from "../../../services/modal/modal.service";
import { WishlistService } from "../../../services/wishlist/wishlist.service";

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
  @ViewChild('mainImage') mainImageElement!: ElementRef;
  @ViewChild('mainImageContainer') mainImageContainer!: ElementRef;
  @ViewChild('thumbnailsContainer') thumbnailsContainer!: ElementRef;

  product: Product = {} as Product;
  filteredSizes: string[] = [];
  selectedColor: string = '';
  selectedSize: string = '';
  selectedQuantity: number = 1;
  isInWishlist: boolean = false;
  currentImage: string = '';
  currentColorImages: string[] = [];
  
  // Zoom properties
  isZooming: boolean = false;
  zoomPosition: ZoomPosition = { x: 0, y: 0 };
  zoomScale: number = 2.5;
  
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

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService,
    private modalService: ModalService,
    private wishlistService: WishlistService
  ) {}

  @HostListener('window:resize')
  onResize() {
    this.calculateMaxScrollPosition();
  }

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.LoadProduct(productId);
    this.loadRelatedProducts();

    this.wishlistService.wishlist$.subscribe(items => {
      this.isInWishlist = items.some(item => item.productId === productId);
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.calculateMaxScrollPosition();
    }, 100);
  }

  LoadProduct(id: number): void {
    // Simulando dados de produto
    this.productService.getProductById(id).subscribe((product: Product) => {
      this.product = product;
      
      // Inicializa com a primeira cor e imagem
      this.selectColor(this.product.colors[0]);
      this.filteredSizes = this.product.sizes || [];
    });
  }

  loadRelatedProducts(): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.relatedProducts = this.findRelatedProducts(response.products);
      }
    });
  }

  findRelatedProducts(products: Product[]): Product[] {
    if (!this.product) return [];
    return products.filter(p => 
      p.id !== this.product.id && 
      (p.categories.some(category => this.product.categories.includes(category)) || 
       p.tags.some(tag => this.product.tags.includes(tag)))
    );
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

  updateQuantity(change: number): void {
    const newQuantity = this.selectedQuantity + change;
    if (newQuantity >= 1 && newQuantity <= this.product.stockQuantity) {
      this.selectedQuantity = newQuantity;
    }
  }

  addToCart(): void {
    if (!this.selectedSize || !this.selectedColor) {
      alert('Por favor, selecione uma cor e um tamanho antes de adicionar ao carrinho.');
      return;
    }

    // Obter a primeira imagem da cor selecionada
    const imageUrl = this.product.imagesByColor[this.selectedColor][0];

    this.cartService.addItem({
      productId: this.product.id,
      name: `${this.product.title} - ${this.getColorName(this.selectedColor)} - ${this.selectedSize}`,
      imageUrl: imageUrl,
      price: this.product.price,
      quantity: this.selectedQuantity,
      color: this.selectedColor,
      size: this.selectedSize,
      stockQuantity: this.product.stockQuantity
    });

    // Feedback para o usuário
    this.modalService.openNotificationModal(
      'info',
      'Produto adicionado ao carrinho',
      `O produto ${this.product.title} da cor ${this.getColorName(this.selectedColor)} e tamanho ${this.selectedSize} foi adicionado ao carrinho.`, 
      5000
    );
  }

  toggleWishlist(): void {
    if (this.isInWishlist) {
      // Encontrar o item na lista de desejos
      this.wishlistService.wishlist$.subscribe(items => {
        const item = items.find(item => item.productId === this.product.id);
        if (item) {
          this.wishlistService.removeItem(item);
          this.modalService.openNotificationModal(
            'info',
            'Removido da lista de desejos',
            `${this.product.title} foi removido da sua lista de desejos.`,
            3000
          );
        }
      }).unsubscribe();
    } else {
      // Adicionar à lista de desejos
      this.wishlistService.addItem({
        productId: this.product.id,
        name: this.product.title,
        imageUrl: this.currentImage,
        price: this.product.price,
        available: this.product.inStock,
        color: this.selectedColor,
        size: this.selectedSize,
        stockQuantity: this.product.stockQuantity
      });
      
      this.modalService.openNotificationModal(
        'success',
        'Adicionado à lista de desejos',
        `${this.product.title} foi adicionado à sua lista de desejos.`,
        3000
      );
    }
    
    this.isInWishlist = !this.isInWishlist;
  }

  // Zoom functionality
  showZoom(): void {
    this.isZooming = true;
  }

  handleZoom(event: MouseEvent): void {
    if (!this.mainImageElement || !this.isZooming) return;
    
    const img = this.mainImageElement.nativeElement;
    const rect = img.getBoundingClientRect();
    
    // Calcular a posição do mouse relativa à imagem
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    // Calcular posição da lente (centralizada no cursor)
    const lensSize = 100;
    const x = Math.max(0, Math.min(mouseX - lensSize/2, rect.width - lensSize));
    const y = Math.max(0, Math.min(mouseY - lensSize/2, rect.height - lensSize));
    
    this.zoomPosition = { x, y };
    
    // Atualizar o estilo da lente para usar a imagem como background
    if (this.mainImageContainer && this.mainImageContainer.nativeElement) {
      const lens = this.mainImageContainer.nativeElement.querySelector('.zoom-lens');
      if (lens) {
        // Configurar o background da lente para mostrar a parte ampliada da imagem
        const ratio = this.zoomScale;
        const backgroundPosX = -(mouseX * ratio - lensSize/2);
        const backgroundPosY = -(mouseY * ratio - lensSize/2);
        
        lens.style.backgroundImage = `url('${this.currentImage}')`;
        lens.style.backgroundSize = `${rect.width * ratio}px ${rect.height * ratio}px`;
        lens.style.backgroundPosition = `${backgroundPosX}px ${backgroundPosY}px`;
      }
    }
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