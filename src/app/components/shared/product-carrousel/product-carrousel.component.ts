import { Component, Input, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-carrousel',
  standalone: false,
  templateUrl: './product-carrousel.component.html',
  styleUrls: ['./product-carrousel.component.css']
})
export class ProductCarouselComponent implements AfterViewInit {
  @Input() products: Product[] = [];
  @Input() navigationEnabled: boolean = true; 
  @ViewChild('carouselTrack', { static: false }) carouselTrack!: ElementRef;

  private visibleCards: number = this.products.length; 
  public currentIndex = 0;
  public cardWidth = 0;
  public displayedProducts: Product[] = []; 

  ngOnInit() {
    this.setupDisplayedProducts();
  }

  ngAfterViewInit() {
    this.calculateCardWidth();
    this.updateCarousel();
    this.adjustVisibleCards();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.calculateCardWidth();
  }

  private adjustVisibleCards(): void {
    const windowWidth = window.innerWidth;

    if (windowWidth < 768) {
      this.visibleCards = 1; 
    } else {
      this.visibleCards = this.products.length; 
    }
    this.setupDisplayedProducts();
  }

  private setupDisplayedProducts(): void {
    this.displayedProducts = this.products.slice(0, this.visibleCards);
  }

  nextSlide(): void {
    if (!this.navigationEnabled) return;

    const firstProduct = this.products[0]; // O primeiro produto atual
    const newProduct = this.products[1]; // O próximo produto

    // Verifica se o próximo produto é igual ao atual
    if (firstProduct.title !== newProduct.title) {
      this.products.push(this.products.shift()!); // Remove o primeiro produto e adiciona ao final
      this.setupDisplayedProducts(); // Atualiza produtos exibidos
    }

    this.updateCarousel();
  }

  prevSlide(): void {
    if (!this.navigationEnabled) return;

    const lastProduct = this.products[this.products.length - 1]; // O último produto atual
    const newProduct = this.products[this.products.length - 2]; // O produto anterior

    // Verifica se o produto anterior é igual ao atual
    if (lastProduct.title !== newProduct.title) {
      this.products.unshift(this.products.pop()!); // Remove o último produto e adiciona ao início
      this.setupDisplayedProducts(); // Atualiza produtos exibidos
    }

    this.updateCarousel();
  }

  private calculateCardWidth(): void {
    const track = this.carouselTrack.nativeElement as HTMLElement;
    this.cardWidth = track.clientWidth / this.visibleCards; 
    this.updateCarousel();
  }

  private updateCarousel(): void {
    const track = this.carouselTrack.nativeElement as HTMLElement;
    track.style.transform = `translateX(-${this.currentIndex * this.cardWidth}px)`;
  }

  onProductActionClick(product: Product): void {
    console.log(`Produto "${product.title}" adicionado ao carrinho!`);
  }
}