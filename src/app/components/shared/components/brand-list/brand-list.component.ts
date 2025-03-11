import { Component, Input, AfterViewInit, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { Brand } from '../../../../models/brand.model';

@Component({
  standalone: false,
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements AfterViewInit, OnDestroy {
  @Input() brands: Brand[] = [];

  // Configurações base para cada breakpoint
  private readonly config = {
    desktop: { minCardSize: 160, idealCardSize: 180, gap: 12, maxColumns: 6, minColumns: 1 },
    tablet: { minCardSize: 140, idealCardSize: 160, gap: 10, maxColumns: 5, minColumns: 1, breakpoint: 992 },
    mobile: { minCardSize: 120, idealCardSize: 140, gap: 8, maxColumns: 4, minColumns: 1, breakpoint: 768 },
    small: { minCardSize: 100, idealCardSize: 120, gap: 8, maxColumns: 3, minColumns: 3, breakpoint: 576 }
  };

  private resizeObserver: ResizeObserver | null = null;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.setupResizeObserver();
    // Inicialização imediata
    this.adjustGridLayout();
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.adjustGridLayout();
  }

  private setupResizeObserver(): void {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.adjustGridLayout();
      });
      
      const trackElement = this.el.nativeElement.querySelector('.brand-list-track');
      if (trackElement) {
        this.resizeObserver.observe(trackElement);
      }
    }
  }

  private adjustGridLayout(): void {
    const trackElement = this.el.nativeElement.querySelector('.brand-list-track');
    const gridElement = this.el.nativeElement.querySelector('.brand-grid');
    
    if (!trackElement || !gridElement) return;
    
    const trackWidth = trackElement.clientWidth;
    const config = this.getCurrentConfig();
    const { minCardSize, idealCardSize, gap, maxColumns, minColumns } = config;
    
    // Se for uma tela muito pequena, usar o layout fixo com 3 colunas
    if (window.innerWidth <= this.config.small.breakpoint) {
      gridElement.style.gridTemplateColumns = `repeat(3, 1fr)`;
      gridElement.style.gap = `${gap}px`;
      gridElement.style.maxWidth = '100%';
      return;
    }
    
    // Calcular quantas colunas cabem no espaço disponível
    const maxPossibleColumns = Math.floor((trackWidth + gap) / (minCardSize + gap));
    
    // Limitar ao número de colunas entre mínimo e máximo
    const columns = Math.min(Math.max(maxPossibleColumns, minColumns), maxColumns);
    
    // Calcular o tamanho do card para ocupar o espaço disponível
    const availableSpace = trackWidth - (gap * (columns - 1));
    const calculatedCardSize = Math.floor(availableSpace / columns);
    
    // Limitar o tamanho do card entre mínimo e ideal
    const cardSize = Math.min(Math.max(calculatedCardSize, minCardSize), idealCardSize);
    
    // Calcular a largura máxima do grid com base no número de colunas
    const maxWidth = cardSize * columns + gap * (columns - 1);
    
    // Aplicar os estilos calculados
    gridElement.style.gridTemplateColumns = `repeat(auto-fill, ${cardSize}px)`;
    gridElement.style.gap = `${gap}px`;
    
    // Se o número de cards for menor que o número de colunas, ajustar a largura máxima
    if (this.brands.length < columns) {
      const actualColumns = this.brands.length;
      const actualWidth = cardSize * actualColumns + gap * (actualColumns - 1);
      gridElement.style.maxWidth = `${actualWidth}px`;
    } else {
      gridElement.style.maxWidth = `${maxWidth}px`;
    }
  }

  private getCurrentConfig() {
    const width = window.innerWidth;
    
    if (width <= this.config.small.breakpoint) {
      return this.config.small;
    } else if (width <= this.config.mobile.breakpoint) {
      return this.config.mobile;
    } else if (width <= this.config.tablet.breakpoint) {
      return this.config.tablet;
    } else {
      return this.config.desktop;
    }
  }

  // Adicione estes métodos à classe BrandListComponent

/**
 * Verifica se deve adicionar placeholders para centralização
 */
shouldAddPlaceholders(): boolean {
  if (!this.brands || this.brands.length === 0) return false;
  
  // Obter a configuração atual
  const config = this.getCurrentConfig();
  
  // Para telas pequenas com grid fixo de 3 colunas
  if (window.innerWidth <= this.config.small.breakpoint) {
    return this.brands.length % 3 !== 0;
  }
  
  // Para outras telas, calcular com base no número de colunas
  const trackElement = this.el.nativeElement.querySelector('.brand-list-track');
  if (!trackElement) return false;
  
  const trackWidth = trackElement.clientWidth;
  const { minCardSize, gap, maxColumns, minColumns } = config;
  
  // Calcular número de colunas
  const maxPossibleColumns = Math.floor((trackWidth + gap) / (minCardSize + gap));
  const columns = Math.min(Math.max(maxPossibleColumns, minColumns), maxColumns);
  
  // Verificar se a última linha está incompleta
  return this.brands.length % columns !== 0;
}

/**
 * Retorna um array com o número de placeholders necessários
 */
getPlaceholders(): number[] {
  if (!this.brands || this.brands.length === 0) return [];
  
  // Obter a configuração atual
  const config = this.getCurrentConfig();
  
  // Para telas pequenas com grid fixo de 3 colunas
  if (window.innerWidth <= this.config.small.breakpoint) {
    const remainder = this.brands.length % 3;
    return remainder === 0 ? [] : Array(3 - remainder).fill(0);
  }
  
  // Para outras telas, calcular com base no número de colunas
  const trackElement = this.el.nativeElement.querySelector('.brand-list-track');
  if (!trackElement) return [];
  
  const trackWidth = trackElement.clientWidth;
  const { minCardSize, gap, maxColumns, minColumns } = config;
  
  // Calcular número de colunas
  const maxPossibleColumns = Math.floor((trackWidth + gap) / (minCardSize + gap));
  const columns = Math.min(Math.max(maxPossibleColumns, minColumns), maxColumns);
  
  // Calcular quantos placeholders são necessários
  const remainder = this.brands.length % columns;
  return remainder === 0 ? [] : Array(columns - remainder).fill(0);
}
}