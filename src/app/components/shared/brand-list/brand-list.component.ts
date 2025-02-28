// brand-list.component.ts
import { Component, Input, ElementRef, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Brand } from '../../../models/brand.model';
import { Subscription } from 'rxjs';
import { WindowSizeService } from '../../../services/window-size/window-size.service';

@Component({
  standalone: false,
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() brands: Brand[] = [];
  
  cardWidth = 150; // Largura padrão do card
  cardGap = 16; // Gap padrão entre cards (var(--spacing-md))
  containerWidth = 0;
  itemsPerRow = 0;
  isMobile = false;
  
  private subscriptions: Subscription[] = [];

  constructor(
    private windowSizeService: WindowSizeService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    // Monitorar mudanças de tamanho da tela
    this.subscriptions.push(
      this.windowSizeService.width$.subscribe(() => {
        this.calculateLayout();
      })
    );
    
    this.subscriptions.push(
      this.windowSizeService.isMobile$.subscribe(isMobile => {
        this.isMobile = isMobile;
        this.calculateLayout();
      })
    );
  }

  ngAfterViewInit() {
    // Calcular o layout inicial após a renderização
    setTimeout(() => this.calculateLayout(), 0);
  }

  ngOnDestroy() {
    // Limpar todas as inscrições
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private calculateLayout() {
    const container = this.elementRef.nativeElement.querySelector('.brand-list-track');
    if (!container) return;
    
    this.containerWidth = container.clientWidth;
    
    if (this.isMobile) {
      // No modo mobile, sempre 3 cards por linha
      this.itemsPerRow = 3;
      const totalGapWidth = (this.itemsPerRow - 1) * this.cardGap;
      this.cardWidth = (this.containerWidth - totalGapWidth) / this.itemsPerRow;
    } else {
      // No desktop, calcular quantos cards cabem
      this.itemsPerRow = this.windowSizeService.calculateItemsPerRow(
        this.containerWidth, 
        this.cardWidth, 
        this.cardGap
      );
    }
  }
}