import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
   @Input() title!: string;
   @Input() imageUrl!: string;
    @Input() route!: string;
   
  constructor(private router: Router) {}

  handleClick() {
    this.router.navigate([this.route]);
  }
}