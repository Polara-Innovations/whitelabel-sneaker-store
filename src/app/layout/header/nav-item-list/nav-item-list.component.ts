import { Component, Input, Output, EventEmitter, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavCategory } from '../../../models/nav-category.model';

@Component({
  standalone: false,
  selector: 'app-nav-item-list',
  templateUrl: './nav-item-list.component.html',
  styleUrls: ['./nav-item-list.component.css']
})
export class NavItemListComponent implements AfterViewInit {
  @Input() tabs: any[] = [];
  @Input() direction: 'row' | 'column' = 'row';
  @Input() isVisible: boolean = true;
  @Input() position: 'left' | 'center' | 'right' | 'space-between' = 'left';
  @Input() categories: NavCategory[] = [];
  @Input() tags: NavCategory[] = [];
  @Output() navItemClicked = new EventEmitter<void>();
  @Output() dropdownToggled = new EventEmitter<boolean>();

  currentRoute: string;

  constructor(
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.currentRoute = this.router.url;

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
    });
  }

  ngAfterViewInit() {
    this.applyPositionStyles();
  }

  private applyPositionStyles() {
    if (this.direction === 'column') {
      const navLinks = this.el.nativeElement.querySelectorAll('.nav-link');
      
      const justifyContent = this.position === 'space-between' ? 'space-between' : this.position;
      const textAlign = this.position === 'space-between' ? 'center' : this.position;  

      navLinks.forEach((link: any) => {
        this.renderer.setStyle(link, 'justify-content', justifyContent);
        this.renderer.setStyle(link, 'text-align', textAlign);
        this.renderer.setStyle(link, 'width', 'auto');
      });
      
      const navItems = this.el.nativeElement.querySelectorAll('.nav-item, .dropdown-nav-item');
      
      navItems.forEach((item: any) => {
        this.renderer.setStyle(item, 'display', 'flex');
        this.renderer.setStyle(item, 'justify-content', justifyContent);
        this.renderer.setStyle(item, 'width', '100%');
      });
    }
  }

  onNavItemClick() {
    this.navItemClicked.emit();
  }

  getItemsForDropdown(tabName: string): NavCategory[] {
    if (tabName.toLowerCase() === 'categorias') {
      return this.categories;
    } else if (tabName.toLowerCase() === 'marcas') {
      return this.tags;
    }
    return [];
  }

  isDropdownTab(tab: any): boolean {
    return tab.type === 'dropdown';
  }

  onDropdownToggled(isOpen: boolean): void {
    this.dropdownToggled.emit(isOpen);
  }
}