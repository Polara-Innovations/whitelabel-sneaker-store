import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css'],
  standalone: false
})
export class ProductInfoComponent {
  @Input() product: any;
  @Input() texts: any;
}