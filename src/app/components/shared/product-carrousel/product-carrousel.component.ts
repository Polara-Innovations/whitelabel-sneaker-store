import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../../models/product.model';
import { WindowSizeService } from '../../../services/window-size/window-size.service';

@Component({
  selector: 'app-product-carrousel',
  templateUrl: './product-carrousel.component.html',
  styleUrls: ['./product-carrousel.component.scss']
})
export class ProductCarouselComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() products: Product[] = [];
  @Input() navigationEnabled: boolean = true;
  @Input() autoPlay: boolean = false;
  @Input() autoPlayInterval: number = 5000;
  @Input() showBullets: boolean = true;
  @Input() isLooping: boolean = true;
  
  @ViewChild('carouselTrack') carouselTrack!: ElementRef;
  
  // Estado do carrossel
  currentIndex: number = 0;
  isMobile: boolean = false;
  translateX: number = 0;
  itemWidth: number = 250;
  itemGap: number = 20;
  containerWidth: number = 0;
  autoPlayTimer: any;
  isTransitioning: boolean = false;
  
  // Para carrossel infinito
  displayedProducts: Product[] = [];
  cloneCount: number = 2; // Número de itens para clonar no início e fim
  realItemsCount: number = 0;
  
  private subscription: Subscription = new Subscription();
  
  constructor(private windowSizeService: WindowSizeService) {}
  
  ngOnInit(): void {
    // Verificar se é dispositivo móvel
    this.isMobile = this.windowSizeService.isMobile();
    
    // Inscrever para mudanças de tamanho de tela
    this.subscription.add(
      this.windowSizeService.isMobile$.subscribe(isMobile => {
        this.isMobile = isMobile;
        setTimeout(() => this.calculateLayout(), 0);
      })
    );

    this.updateNavigationEnabled();
    
    // Preparar produtos para carrossel infinito
    this.setupInfiniteCarousel();
    
    // Iniciar autoplay se necessário
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.calculateLayout();
      // Iniciar no primeiro item real (após os clones)
      this.currentIndex = this.cloneCount;
      this.updatePosition(false);
    }, 0);
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.stopAutoPlay();
  }

  updateNavigationEnabled(): void {
    if (this.isMobile) {
      this.navigationEnabled = false;
      this.startAutoPlay();
    } else {
      this.navigationEnabled = true;
      this.stopAutoPlay();
    }
  }
  
  /**
   * Prepara o array de produtos para carrossel infinito
   */
  setupInfiniteCarousel(): void {
    if (!this.products || this.products.length === 0) return;
    
    this.realItemsCount = this.products.length;
    
    // Cria um novo array com itens clonados no início e fim
    this.displayedProducts = [];
    
    // Adiciona clones do final no início
    for (let i = this.realItemsCount - this.cloneCount; i < this.realItemsCount; i++) {
      this.displayedProducts.push({...this.products[i]});
    }
    
    // Adiciona os itens originais
    this.products.forEach(product => {
      this.displayedProducts.push({...product});
    });
    
    // Adiciona clones do início no final
    for (let i = 0; i < this.cloneCount; i++) {
      this.displayedProducts.push({...this.products[i]});
    }
  }
  
  @HostListener('window:resize')
  onResize(): void {
    this.calculateLayout();
  }
  
  /**
   * Calcula o layout do carrossel
   */
  calculateLayout(): void {
    if (!this.carouselTrack || !this.displayedProducts || this.displayedProducts.length === 0) return;
    
    const track = this.carouselTrack.nativeElement as HTMLElement;
    const container = track.parentElement;
    if (!container) return;
    
    this.containerWidth = container.clientWidth;
    
    if (this.isMobile) {
      // Em mobile, cada item ocupa 80% da largura do container
      this.itemWidth = this.containerWidth * 0.8;
    } else {
      // Em desktop, usar largura fixa para os itens
      this.itemWidth = 250;
    }
    
    // Atualizar a posição
    this.updatePosition(false);
  }
  
  /**
   * Atualiza a posição do carrossel
   */
  updatePosition(animate: boolean = true): void {
    if (!this.carouselTrack) return;
    
    const track = this.carouselTrack.nativeElement as HTMLElement;
    
    if (animate) {
      track.style.transition = 'transform 0.3s ease';
    } else {
      track.style.transition = 'none';
    }
    
    if (this.isMobile) {
      // Em mobile, centralizar o item atual
      const offset = (this.containerWidth - this.itemWidth) / 2;
      this.translateX = offset - (this.currentIndex * (this.itemWidth + this.itemGap));
    } else {
      // Em desktop, mover de acordo com o índice atual
      this.translateX = -(this.currentIndex * (this.itemWidth + this.itemGap));
    }
    
    track.style.transform = `translateX(${this.translateX}px)`;
    
    // Verificar se precisa fazer o "salto" para criar o efeito infinito
    if (animate) {
      this.checkInfiniteTransition();
    }
  }
  
  /**
   * Verifica se precisa fazer a transição para o carrossel infinito
   */
  checkInfiniteTransition(): void {
    if (this.isTransitioning || !this.isLooping) return;
    
    const totalItems = this.displayedProducts.length;
    
    // Se chegou no último clone, pular para o item real correspondente
    if (this.currentIndex >= totalItems - this.cloneCount) {
      this.isTransitioning = true;
      
      // Aguardar a animação terminar
      setTimeout(() => {
        // Calcular o índice real (remove os clones)
        const newIndex = this.cloneCount;
        
        // Desativar a animação para o salto
        this.currentIndex = newIndex;
        this.updatePosition(false);
        
        this.isTransitioning = false;
      }, 300); // Mesmo tempo da transição CSS
    }
    
    // Se chegou no primeiro clone, pular para o item real correspondente
    else if (this.currentIndex < this.cloneCount) {
      this.isTransitioning = true;
      
      // Aguardar a animação terminar
      setTimeout(() => {
        // Calcular o índice real (remove os clones)
        const newIndex = totalItems - this.cloneCount * 2 + this.currentIndex;
        
        // Desativar a animação para o salto
        this.currentIndex = newIndex;
        this.updatePosition(false);
        
        this.isTransitioning = false;
      }, 300); // Mesmo tempo da transição CSS
    }
  }
  
  /**
   * Navega para o próximo slide
   */
  goToNext(): void {
    if (this.isTransitioning || !this.displayedProducts || this.displayedProducts.length <= 1) return;
    
    this.currentIndex++;
    this.updatePosition();
    
    if (this.autoPlay) {
      this.resetAutoPlay();
    }
  }
  
  /**
   * Navega para o slide anterior
   */
  goToPrev(): void {
    if (this.isTransitioning || !this.displayedProducts || this.displayedProducts.length <= 1) return;
    
    this.currentIndex--;
    this.updatePosition();
    
    if (this.autoPlay) {
      this.resetAutoPlay();
    }
  }
  
  /**
   * Navega para um slide específico
   */
  goToSlide(index: number): void {
    if (this.isTransitioning || !this.products || this.products.length === 0) return;
    
    // Ajustar o índice para considerar os clones
    this.currentIndex = index + this.cloneCount;
    this.updatePosition();
    
    if (this.autoPlay) {
      this.resetAutoPlay();
    }
  }
  
  /**
   * Verifica se está no primeiro slide real (não clone)
   */
  isFirstSlide(): boolean {
    return this.getRealIndex() === 0;
  }
  
  /**
   * Verifica se está no último slide real (não clone)
   */
  isLastSlide(): boolean {
    return this.getRealIndex() === this.realItemsCount - 1;
  }
  
  /**
   * Obtém o índice real (sem considerar os clones)
   */
  getRealIndex(): number {
    // Calcular o índice real considerando os clones
    let realIndex = (this.currentIndex - this.cloneCount) % this.realItemsCount;
    if (realIndex < 0) realIndex += this.realItemsCount;
    return realIndex;
  }
  
  /**
   * Inicia o autoplay
   */
  startAutoPlay(): void {
    this.stopAutoPlay();
    this.autoPlayTimer = setInterval(() => {
      if (!this.isTransitioning) {
        this.goToNext();
      }
    }, this.autoPlayInterval);
  }
  
  /**
   * Para o autoplay
   */
  stopAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }
  
  /**
   * Reinicia o autoplay
   */
  resetAutoPlay(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}