import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../../models/product.model';
import { WindowSizeService } from '../../../services/window-size/window-size.service';

@Component({
  selector: 'app-product-carrousel',
  templateUrl: './product-carrousel.component.html',
  styleUrls: ['./product-carrousel.component.scss']
})
export class ProductCarouselComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() products: Product[] = [];
  @Input() navigationEnabled: boolean = true;
  @Input() autoPlay: boolean = false;
  @Input() autoPlayInterval: number = 5000;
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
  showBullets: boolean = true;
  showNavigation: boolean = true;

  // Para carrossel infinito
  displayedProducts: Product[] = [];
  cloneCount: number = 2; // Número de itens para clonar no início e fim
  realItemsCount: number = 0;

  // Para bullets
  maxVisibleBullets: number = 5; // Total de bullets visíveis (incluindo primeiro e último)

  private subscription: Subscription = new Subscription();

  constructor(private windowSizeService: WindowSizeService) { }

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

    // Preparar produtos para carrossel infinito
    if (this.products && this.products.length > 0) {
      this.setupInfiniteCarousel();
    }

    // Iniciar autoplay se necessário
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Se os produtos mudarem, reconfigura o carrossel
    if (changes['products'] && !changes['products'].firstChange) {
      this.setupInfiniteCarousel();
      setTimeout(() => {
        this.calculateLayout();
        // Reiniciar no primeiro item real
        this.currentIndex = this.cloneCount;
        this.updatePosition(false);
      }, 0);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.calculateLayout();
      this.updateNavigationEnabled();
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
      this.showNavigation = false;
      this.showBullets = this.navigationEnabled 
      if (this.autoPlay) {
        this.startAutoPlay();
      }
    } else {
      this.showNavigation = this.navigationEnabled 
      this.showBullets = false
      if (!this.autoPlay) {
        this.stopAutoPlay();
      }
    }
  }

  /**
  
  Prepara o array de produtos para carrossel infinito
  */
  setupInfiniteCarousel(): void {
    if (!this.products || this.products.length === 0) {
      this.displayedProducts = [];
      return;
    }

    this.realItemsCount = this.products.length;

    // Aumentar o número de clones para evitar bugs visuais
    const extraClones = 4; // Clones extras para pré-carregamento
    const totalClones = this.cloneCount + extraClones;

    // Cria um novo array com itens clonados no início e fim
    this.displayedProducts = [];

    // Adiciona clones do final no início
    for (let i = this.realItemsCount - totalClones; i < this.realItemsCount; i++) {
      const index = ((i % this.realItemsCount) + this.realItemsCount) % this.realItemsCount;
      this.displayedProducts.push({ ...this.products[index] });
    }

    // Adiciona os itens originais
    this.products.forEach(product => {
      this.displayedProducts.push({ ...product });
    });

    // Adiciona clones do início no final
    for (let i = 0; i < totalClones; i++) {
      const index = i % this.realItemsCount;
      this.displayedProducts.push({ ...this.products[index] });
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.calculateLayout();
  }

  /**
  
  Calcula o layout do carrossel
  */
  calculateLayout(): void {
    if (!this.carouselTrack || !this.displayedProducts || this.displayedProducts.length === 0) return;

    const track = this.carouselTrack.nativeElement as HTMLElement;
    const container = track.closest('.carousel-container');
    if (!container) return;

    this.containerWidth = container.clientWidth;

    if (this.isMobile) {
      // Em mobile, cada item ocupa 80% da largura do container, com limite máximo
      this.itemWidth = Math.min(this.containerWidth * 0.8, 300);
      this.itemGap = 10; // Gap menor em mobile
    } else {
      // Em desktop, usar largura fixa para os itens
      this.itemWidth = 250;
      this.itemGap = 20;
    }

    // Definir a largura total do track para acomodar todos os itens
    const totalWidth = this.displayedProducts.length * (this.itemWidth + this.itemGap) - this.itemGap;
    track.style.width = `${totalWidth}px`;

    // Atualizar a posição
    this.updatePosition(false);
  }

  /**
  
  Atualiza a posição do carrossel
  */
  updatePosition(animate: boolean = true): void {
    if (!this.carouselTrack || this.displayedProducts.length === 0) return;
    const track = this.carouselTrack.nativeElement as HTMLElement;

    if (animate) {
      track.style.transition = 'transform 0.3s ease-out';
    } else {
      track.style.transition = 'none';
    }

    // Calcular o deslocamento para centralizar o item atual
    if (this.isMobile) {
      // Em mobile, cada item ocupa toda a largura
      this.translateX = -(this.currentIndex * this.itemWidth);
    } else {
      // Em desktop, garantir que o primeiro item visível esteja alinhado com a borda esquerda
      this.translateX = -(this.currentIndex * (this.itemWidth + this.itemGap));
    }

    track.style.transform = `translateX(${this.translateX}px)`;

    // Verificar se precisa fazer o "salto" para criar o efeito infinito
    if (animate) {
      this.checkInfiniteTransition();
    }
  }

  /**
  
  Verifica se precisa fazer a transição para o carrossel infinito
  */
  checkInfiniteTransition(): void {
    if (this.isTransitioning || !this.isLooping || this.displayedProducts.length <= this.realItemsCount) return;

    const totalItems = this.displayedProducts.length;
    const extraClones = 4; // Deve ser o mesmo valor usado em setupInfiniteCarousel
    const totalClones = this.cloneCount + extraClones;

    // Se chegou próximo do final dos clones, pular para o item real correspondente
    if (this.currentIndex >= totalItems - totalClones) {
      this.isTransitioning = true;

      // Aguardar a animação terminar
      setTimeout(() => {
        // Calcular o índice real (remove os clones)
        const newIndex = totalClones + (this.currentIndex - (totalItems - totalClones)) % this.realItemsCount;

        // Desativar a animação para o salto
        this.currentIndex = newIndex;
        this.updatePosition(false);

        this.isTransitioning = false;
      }, 300); // Mesmo tempo da transição CSS
    } else if (this.currentIndex < totalClones) {
      this.isTransitioning = true;

      // Aguardar a animação terminar
      setTimeout(() => {
        // Calcular o índice real (remove os clones)
        const newIndex = totalItems - totalClones * 2 + this.currentIndex;

        // Desativar a animação para o salto
        this.currentIndex = newIndex;
        this.updatePosition(false);

        this.isTransitioning = false;
      }, 300); // Mesmo tempo da transição CSS
    }
  }

  /**
  
  Navega para o próximo slide
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
  
  Navega para o slide anterior
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
  
  Navega para um slide específico
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
  
  Verifica se está no primeiro slide real (não clone)
  */
  isFirstSlide(): boolean {
    return this.getRealIndex() === 0;
  }
  /**
  
  Verifica se está no último slide real (não clone)
  */
  isLastSlide(): boolean {
    return this.getRealIndex() === this.realItemsCount - 1;
  }
  /**
  
  Obtém o índice real (sem considerar os clones)
  */
  getRealIndex(): number {
    if (this.realItemsCount === 0) return 0;
    // Calcular o índice real considerando os clones
    let realIndex = (this.currentIndex - this.cloneCount) % this.realItemsCount;
    if (realIndex < 0) realIndex += this.realItemsCount;
    return realIndex;
  }

  /**
   * Abordagem simplificada para mostrar os bullets
   * Mantém sempre visíveis 3 bullets do meio, além do primeiro e último
   */
  getVisibleBullets(): number[] {
    if (!this.products || this.products.length === 0) return [];

    const totalItems = this.products.length;
    const realIndex = this.getRealIndex();
    const visibleCount = 5; // Sempre mostrar 5 bullets

    // Se tivermos 5 ou menos itens, mostrar todos
    if (totalItems <= visibleCount) {
      return Array.from({ length: totalItems }, (_, i) => i);
    }

    // Calcular a "página" atual baseada no índice real
    let startIndex = Math.max(0, Math.min(realIndex - Math.floor(visibleCount / 2), totalItems - visibleCount));

    // Criar array com os índices dos bullets visíveis
    return Array.from({ length: visibleCount }, (_, i) => startIndex + i);
  }

  /**
  
  Inicia o autoplay
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
  
  Para o autoplay
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