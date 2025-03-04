// category-card.component.ts
import { Component, Input, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../../models/category.model';

@Component({
  standalone: false,
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
  @Input() category!: Category;
  
  // Permitir ajuste de largura externamente
  @HostBinding('style.width') width = '250px';
  @HostBinding('style.display') display = 'block';
  
  constructor(private router: Router) {}

  @Input()
  set ngStyle(styles: {[key: string]: any}) {
    if (styles && styles['width.px']) {
      this.width = `${styles['width.px']}px`;
    }
  }

  onCardClick(): void {
    this.router.navigate(['/products'], { queryParams: { category: this.category.name } });
  }
}