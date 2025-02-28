import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-nav-item-list',
  templateUrl: './nav-item-list.component.html',
  styleUrls: ['./nav-item-list.component.css']
})
export class NavItemListComponent {
  @Input() tabs: any[] = [];
  @Input() direction: 'row' | 'column' = 'row'; 
  @Input() isVisible: boolean = false;
  currentRoute: string;

  constructor(private router: Router) {
    this.currentRoute = this.router.url; 
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  handleAction(action: string | null) {
    if (action && typeof (this as any)[action] === 'function') {
      (this as any)[action]();
    }
  }
}