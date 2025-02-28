// category-card.component.ts
import { Component, Input, HostBinding } from '@angular/core';
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

  handleClick() {
    this.router.navigate([this.route]);
  }
}