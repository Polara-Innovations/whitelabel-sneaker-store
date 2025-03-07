import { Component, Input, AfterViewInit, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { Category } from '../../../models/category.model';

@Component({
  standalone: false,
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements AfterViewInit, OnDestroy {
  @Input() categories: Category[] = [];
  cardWidth: number = 160; // Valor inicial

  // Configurações base para cada breakpoint
  private readonly config = {
    desktop: { minCardSize: 160, idealCardSize: 180, gap: 16, maxColumns: 6, minColumns: 1 },
    tablet: { minCardSize: 140, idealCardSize: 160, gap: 12, maxColumns: 5, minColumns: 1, breakpoint: 992 },
    mobile: { minCardSize: 120, idealCardSize: 140, gap: 8, maxColumns: 4, minColumns: 1, breakpoint: 768 },
    small: { minCardSize: 100, idealCardSize: 120, gap: 8, maxColumns: 3, minColumns: 3, breakpoint: 576 }
  };

  private resizeObserver: ResizeObserver | null = null;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.setupResizeObserver();
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
      
      const trackElement = this.el.nativeElement.querySelector('.category-list-track');
      if (trackElement) {
        this.resizeObserver.observe(trackElement);
      }
    }
  }

  private adjustGridLayout(): void {
    const trackElement = this.el.nativeElement.querySelector('.category-list-track');
    
    if (!trackElement) return;
    
    const trackWidth = trackElement.clientWidth;
    const config = this.getCurrentConfig();
    const { minCardSize, idealCardSize, gap, maxColumns, minColumns } = config;
    
    const maxPossibleColumns = Math.floor((trackWidth + gap) / (minCardSize + gap));
    const columns = Math.min(Math.max(maxPossibleColumns, minColumns), maxColumns);
    
    const availableSpace = trackWidth - (gap * (columns - 1));
    this.cardWidth = Math.min(Math.max(Math.floor(availableSpace / columns), minCardSize), idealCardSize);
    
    this.updateTrackStyle(trackElement, gap);
  }

  private updateTrackStyle(trackElement: HTMLElement, gap: number): void {
    trackElement.style.gap = `${gap}px`;
    trackElement.style.display = 'grid';
    trackElement.style.gridTemplateColumns = `repeat(auto-fill, ${this.cardWidth}px)`;
    trackElement.style.justifyContent = 'center';
    
    const maxWidth = this.cardWidth * Math.min(this.categories.length, this.config.desktop.maxColumns) + gap * (Math.min(this.categories.length, this.config.desktop.maxColumns) - 1);
    
    trackElement.style.maxWidth = this.categories.length < this.config.desktop.maxColumns ? `${maxWidth}px` : '100%';
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

  shouldAddPlaceholders(): boolean {
    if (!this.categories || this.categories.length === 0) return false;
    
    const config = this.getCurrentConfig();
    const trackElement = this.el.nativeElement.querySelector('.category-list-track');
    if (!trackElement) return false;
    
    const trackWidth = trackElement.clientWidth;
    const maxPossibleColumns = Math.floor((trackWidth + config.gap) / (config.minCardSize + config.gap));
    const columns = Math.min(Math.max(maxPossibleColumns, config.minColumns), config.maxColumns);
    
    return this.categories.length % columns !== 0;
  }

  getPlaceholders(): number[] {
    if (!this.categories || this.categories.length === 0) return [];
    
    const config = this.getCurrentConfig();
    const trackElement = this.el.nativeElement.querySelector('.category-list-track');
    if (!trackElement) return [];
    
    const remainder = this.categories.length % config.maxColumns;
    return remainder === 0 ? [] : Array(config.maxColumns - remainder).fill(0);
  }
}