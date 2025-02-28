import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
  standalone: false
})
export class ProductSearchComponent implements OnInit {
  @Input() initialValue: string = '';
  @Output() search = new EventEmitter<string>();
  
  searchTerm: string = '';
  searchTerms = new Subject<string>();
  
  ngOnInit(): void {
    this.searchTerm = this.initialValue;
    
    // Configurar debounce para evitar muitas chamadas durante a digitação
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.search.emit(term);
    });
  }
  
  onSearch(): void {
    this.search.emit(this.searchTerm);
  }
  
  updateSearchTerm(term: string): void {
    this.searchTerm = term;
    this.searchTerms.next(term);
  }
  
  clearSearch(): void {
    this.searchTerm = '';
    this.search.emit('');
  }
}