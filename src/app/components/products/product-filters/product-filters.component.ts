// Modificações no product-filters.component.ts
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FilterGroup } from '../../../models/filter.model';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss']
})
export class ProductFiltersComponent implements OnChanges {
  @Input() filterGroups: FilterGroup[] = [];
  @Input() priceRange: { min: number, max: number } = { min: 0, max: 1000 };
  @Input() products: Product[] = []; // Receber a lista de produtos
  
  @Output() filterChange = new EventEmitter<{filterId: string, optionId: string, checked: boolean}>();
  @Output() priceRangeChange = new EventEmitter<{min: number, max: number}>();
  
  minPrice: number = 0;
  maxPrice: number = 1000;
  maxPossiblePrice: number = 1000; // Valor padrão
  
  ngOnChanges(changes: SimpleChanges): void {
    // Inicializar os valores de preço
    this.minPrice = this.priceRange.min;
    this.maxPrice = this.priceRange.max;
    
    // Verificar se os produtos foram alterados
    if (changes['products'] && this.products && this.products.length > 0) {
      this.calculateMaxPrice();
    }
  }
  
  calculateMaxPrice(): void {
    if (this.products && this.products.length > 0) {
      // Encontrar o maior preço entre os produtos
      this.maxPossiblePrice = Math.max(...this.products.map(product => product.price));
      
      // Arredondar para a centena superior para facilitar a visualização
      this.maxPossiblePrice = Math.ceil(this.maxPossiblePrice / 100) * 100;
      
      // Atualizar o maxPrice se necessário
      if (this.maxPrice === 1000 || this.maxPrice > this.maxPossiblePrice) {
        this.maxPrice = this.maxPossiblePrice;
        // Emitir o evento com o novo preço máximo
        this.priceRangeChange.emit({ 
          min: this.minPrice, 
          max: this.maxPrice 
        });
      }
    }
  }

  toggleGroup(group: FilterGroup): void {
    group.expanded = !group.expanded;
  }
  
  onFilterChange(filterId: string, optionId: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.filterChange.emit({ filterId, optionId, checked });
  }
  
  onPriceRangeChange(): void {
    // Garantir que minPrice não seja maior que maxPrice
    if (this.minPrice > this.maxPrice) {
      this.minPrice = this.maxPrice;
    }
    
    this.priceRangeChange.emit({ 
      min: this.minPrice, 
      max: this.maxPrice 
    });
  }
}