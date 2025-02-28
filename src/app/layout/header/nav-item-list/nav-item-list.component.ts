import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  standalone: false,
  selector: 'app-nav-item-list',
  templateUrl: './nav-item-list.component.html',
  styleUrls: ['./nav-item-list.component.css']
})
export class NavItemListComponent {
  @Input() tabs: any[] = [];
  @Input() direction: 'row' | 'column' = 'row'; 
  @Input() isVisible: boolean = true;
  @Input() position: 'left' | 'center' | 'right' = 'left';
  @Output() navItemClicked = new EventEmitter<void>();
  
  currentRoute: string;

  constructor(private router: Router) {
    this.currentRoute = this.router.url; 
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
    });
  }

  onNavItemClick() {
    this.navItemClicked.emit();
  }
}