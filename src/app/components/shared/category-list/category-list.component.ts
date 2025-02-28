// category-list.component.ts
import { Component, Input, OnInit, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Category } from '../../../models/category.model';
import { Subscription } from 'rxjs';
import { WindowSizeService } from '../../../services/window-size/window-size.service';

@Component({
  selector: 'app-category-list',
  standalone: false,
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() categories: Category[] = [];
  
  cardWidth = 250; // Largura padrão do card
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
    const container = this.elementRef.nativeElement.querySelector('.category-list-track');
    if (!container) return;
    
    this.containerWidth = container.clientWidth;
    
    if (this.isMobile) {
      // No modo mobile, sempre 2 cards por linha
      this.itemsPerRow = 2;
      this.cardWidth = (this.containerWidth - this.cardGap) / 2;
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