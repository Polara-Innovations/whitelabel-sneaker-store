// category-card.component.ts
import { Component, Input, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../../../models/category.model';

@Component({
  standalone: false,
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
  @Input() category!: Category;
  
  constructor(private router: Router) {}

  onCardClick(): void {
    this.router.navigate(['/products'], { queryParams: { category: this.category.name } });
  }
}