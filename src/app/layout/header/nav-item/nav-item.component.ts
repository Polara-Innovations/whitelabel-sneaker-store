import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.css'],
  standalone: false
})
export class NavItemComponent {
  @Input() name!: string;
  @Input() route!: string;
}