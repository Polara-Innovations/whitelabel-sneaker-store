import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { SettingsService } from '../../services/settings/settings.service';
import { ThemeService } from '../../services/theme/theme.service';
import { CartService } from '../../services/cart/cart.service';
import { Subscription } from 'rxjs';

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
  
  private cartCountSubscription?: Subscription;
  private themeSubscription?: Subscription;

  constructor(
    private settingsService: SettingsService,
    private themeService: ThemeService,
    private cartService: CartService
  ) {
    const menuConfig = this.settingsService.getMenuConfig().header;
    this.isHamburgerMenu = menuConfig.type === 'hamburger';
    this.tabs = menuConfig.items;
    this.logoUrl = this.settingsService.getLogoUrl();
  }

  ngOnInit() {
    this.checkIfMobile();
    
    // Inscrever-se para receber atualizações do tema
    this.themeSubscription = this.themeService.currentThemeMode.subscribe(mode => {
      this.isDarkMode = mode === 'dark';
    });
    
    // Inscrever-se para receber atualizações da contagem de itens no carrinho
    this.cartCountSubscription = this.cartService.cartCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  }

  ngOnDestroy() {
    // Limpar inscrições
    if (this.cartCountSubscription) {
      this.cartCountSubscription.unsubscribe();
    }
    
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  @HostListener('window:resize')
  checkIfMobile() {
    const prevMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 768;
    
    // Se mudou de desktop para mobile, feche menus abertos
    if (!prevMobile && this.isMobile) {
      this.closeAllMenus();
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    
    // Fechar outros menus quando abrir o menu principal
    if (this.isMenuOpen) {
      this.isSettingsOpen = false;
      this.isCartOpen = false;
      this.isProfileOpen = false;
    }
  }

  toggleSettings() {
    this.isSettingsOpen = !this.isSettingsOpen;
    
    // Fechar outros menus quando abrir configurações
    if (this.isSettingsOpen) {
      this.isCartOpen = false;
      this.isProfileOpen = false;
      this.isMenuOpen = false;
    }
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
    
    // Fechar outros menus quando abrir carrinho
    if (this.isCartOpen) {
      this.isSettingsOpen = false;
      this.isProfileOpen = false;
      this.isMenuOpen = false;
    }
  }

  toggleProfile() {
    this.isProfileOpen = !this.isProfileOpen;
    
    // Fechar outros menus quando abrir perfil
    if (this.isProfileOpen) {
      this.isSettingsOpen = false;
      this.isCartOpen = false;
      this.isMenuOpen = false;
    }
  }

  closeAllMenus() {
    this.isMenuOpen = false;
    this.isSettingsOpen = false;
    this.isCartOpen = false;
    this.isProfileOpen = false;
  }

  // Fechar menus quando clicar fora deles
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    
    // Verifica se o clique foi fora dos menus
    if (!target.closest('.navbar') && 
        !target.closest('.settings-container') && 
        !target.closest('.cart-modal-container') &&
        !target.closest('.hamburger-menu') &&
        !target.closest('.mobile-menu-dropdown')) {
      this.closeAllMenus();
    }
  }
}