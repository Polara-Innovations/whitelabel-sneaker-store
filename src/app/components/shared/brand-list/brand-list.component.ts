import { Component, Input } from '@angular/core';
import { Brand } from '../../../models/brand.model';

@Component({
  standalone: false,
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent {
  @Input() brands: Brand[] = [];
}