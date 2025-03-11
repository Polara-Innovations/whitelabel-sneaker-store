import { Component, OnInit, OnDestroy, HostListener, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ThemeService } from '../../../services/theme/theme.service';
import { CartService } from '../../../services/cart/cart.service';
import { NavService } from '../../../services/api/nav/nav.service';
import { Subscription } from 'rxjs';
import { NavCategory } from '../../../models/nav-category.model';
import { MenuService } from '../../../services/api/menu/menu.service';
import { MenuConfig } from '../../../models/menu-config.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false
})
export class HeaderComponent implements OnInit, OnDestroy {
  isDarkMode = false;
  isHamburgerMenu = false;
  isMobile = false;
  tabs: any[] = [];
  logoUrl: string | null = null;
  isMenuOpen = false;
  brandName: string = 'Sneaker Store';
  isSettingsOpen = false;
  isCartOpen = false;
  isProfileOpen = false;
  cartItemCount = 0;
  categories: NavCategory[] = [];
  tags: NavCategory[] = [];
  isDropdownOpen = false;

  @ViewChild('menuBackdrop', { static: false }) menuBackdrop: ElementRef | null = null;
  private dropdownElements: HTMLElement[] = [];

  private categoriesSubscription?: Subscription;
  private tagsSubscription?: Subscription;
  private cartCountSubscription?: Subscription;
  private themeSubscription?: Subscription;

  constructor(
    private menuService: MenuService,
    private themeService: ThemeService,
    private cartService: CartService,
    private navService: NavService,
    private renderer: Renderer2
  ) {
    const menuConfig = this.menuService.loadMenuConfig().subscribe(config => {
      this.setupMenu(config);
    }
    );
    this.logoUrl = 'https://triibo.com.br/wp-content/uploads/2023/02/Imagem-Nike-Logo-PNG-1024x1024-1.png'
  }

  private setupMenu(config: MenuConfig): void {
    this.isHamburgerMenu = config.type === 'hamburger';
    this.tabs = config.tabs;
  }

  ngOnInit() {
    this.checkIfMobile();
    this.themeSubscription = this.themeService.currentThemeType.subscribe(type => {
      this.isDarkMode = type === 'dark';
    });
    this.cartCountSubscription = this.cartService.cartCount$.subscribe(count => {
      this.cartItemCount = count;
    });
    this.loadNavData();
  }

  ngOnDestroy() {
    this.cartCountSubscription?.unsubscribe();
    this.themeSubscription?.unsubscribe();
    this.categoriesSubscription?.unsubscribe();
    this.tagsSubscription?.unsubscribe();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.checkIfMobile();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.navbar') &&
      !target.closest('.settings-container') &&
      !target.closest('.cart-modal-container') &&
      !target.closest('.hamburger-menu') &&
      !target.closest('.mobile-menu-dropdown')) {
      this.closeAllMenus();
    }
  }

  private checkIfMobile() {
    const prevMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 768;
    if (!prevMobile && this.isMobile) {
      this.closeAllMenus();
    }
  }

  private loadNavData() {
    this.categoriesSubscription = this.navService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
    this.tagsSubscription = this.navService.getTags().subscribe(tags => {
      this.tags = tags;
    });
  }

  getItemsForDropdown(tabName: string): NavCategory[] {
    if (tabName.toLowerCase() === 'categorias') {
      return this.categories;
    } else if (tabName.toLowerCase() === 'marcas') {
      return this.tags;
    }
    return [];
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.isSettingsOpen = false;
      this.isCartOpen = false;
      this.isProfileOpen = false;
    }
  }

  toggleSettings() {
    this.isSettingsOpen = !this.isSettingsOpen;
    if (this.isSettingsOpen) {
      this.isCartOpen = false;
      this.isProfileOpen = false;
      this.isMenuOpen = false;
    }
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
    if (this.isCartOpen) {
      this.isSettingsOpen = false;
      this.isProfileOpen = false;
      this.isMenuOpen = false;
    }
  }

  toggleProfile() {
    this.isProfileOpen = !this.isProfileOpen;
    if (this.isProfileOpen) {
      this.isSettingsOpen = false;
      this.isCartOpen = false;
      this.isMenuOpen = false;
    }
  }

  closeAllMenus(): void {
    this.isMenuOpen = false;
    this.isSettingsOpen = false;
    this.isCartOpen = false;
    this.isProfileOpen = false;
    this.isDropdownOpen = false;
    this.dropdownElements.forEach(dropdown => {
      this.renderer.removeClass(dropdown, 'show');
    });
  }

  onDropdownToggled(isOpen: boolean): void {
    this.isDropdownOpen = isOpen;

    // Se abrir um dropdown, fechar outros menus
    if (isOpen) {
      this.isSettingsOpen = false;
      this.isCartOpen = false;
      this.isProfileOpen = false;
    }

  }
}
