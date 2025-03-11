import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SortOption } from '../../../../models/filter.model';
@Component({
  selector: 'app-product-sort',
  templateUrl: './product-sort.component.html',
  styleUrls: ['./product-sort.component.scss']
})
export class ProductSortComponent {
  @Input() options: SortOption[] = [];
  @Input() selected: string = '';
  @Output() sortChange = new EventEmitter<string>();
  
  onChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.sortChange.emit(target.value);
  }
}