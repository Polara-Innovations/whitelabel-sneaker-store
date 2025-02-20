import { Component, Input } from '@angular/core';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-category-list',
  standalone: false,
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  @Input() categories: Category[] = [];
}