import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BRAND_THEMES, DEFAULT_BRAND_ID } from '../../mocks/mock-theme';
import { BrandTheme, ThemeConfig } from '../../models/theme-config-model';

type ThemeMode = 'light' | 'dark' | 'high-contrast';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private currentBrandId: string = DEFAULT_BRAND_ID;
  private _currentThemeMode: ThemeMode = 'light'; // Variável privada para armazenar o valor atual

  // Observable para componentes se inscreverem em mudanças de tema
  private themeSubject = new BehaviorSubject<ThemeConfig | null>(null);
  private themeModeSubject = new BehaviorSubject<ThemeMode>('light');

  // Expor os observables para os componentes
  currentTheme = this.themeSubject.asObservable();
  currentThemeMode = this.themeModeSubject.asObservable(); // Este deve ser um Observable, não uma string

  // Cache de temas para evitar consultas frequentes
  private themeCache: Map<string, ThemeConfig> = new Map();

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);

    // Carregar tema salvo ou usar padrão
    this.loadSavedTheme();

    // Aplicar tema inicial
    this.applyTheme();
  }

  /**
   * Carrega o tema salvo do localStorage ou usa o padrão
   */
  private loadSavedTheme(): void {
    const savedBrandId = localStorage.getItem('brandId') || DEFAULT_BRAND_ID;
    const savedThemeMode = localStorage.getItem('themeMode') as ThemeMode || 'light';
    this.currentBrandId = savedBrandId;
    this._currentThemeMode = savedThemeMode;

    this.themeModeSubject.next(this._currentThemeMode);
  }

  /**
   * Obtém o tema atual com base no ID da marca e modo
   */
  private getCurrentThemeConfig(): ThemeConfig {
    const cacheKey = `${this.currentBrandId}_${this._currentThemeMode}`;

    // Verificar cache primeiro
    if (this.themeCache.has(cacheKey)) {
      return this.themeCache.get(cacheKey)!;
    }

    // Buscar do mock (ou futuramente do backend)
    const brandTheme = BRAND_THEMES.find(theme => theme.brandId === this.currentBrandId)
      || BRAND_THEMES.find(theme => theme.brandId === DEFAULT_BRAND_ID)!;

    let themeConfig: ThemeConfig;

    switch (this._currentThemeMode) {
      case 'dark':
        themeConfig = brandTheme.darkTheme;
        break;
      case 'high-contrast':
        themeConfig = brandTheme.highContrastTheme;
        break;
      default:
        themeConfig = brandTheme.lightTheme;
    }

    // Armazenar no cache
    this.themeCache.set(cacheKey, themeConfig);

    return themeConfig;
  }

  /**
   * Aplica o tema atual ao documento, atualizando as variáveis CSS
   */
  private applyTheme(): void {
    const theme = this.getCurrentThemeConfig();

    // Atualizar o observable
    this.themeSubject.next(theme);

    // Aplicar variáveis CSS globais
    this.setCssVariables(theme);

    // Adicionar/remover classes do body
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-high-contrast');
    document.body.classList.add(`theme-${this._currentThemeMode}`);

    // Salvar preferências
    localStorage.setItem('brandId', this.currentBrandId);
    localStorage.setItem('themeMode', this._currentThemeMode);
  }

  /**
   * Define as variáveis CSS com base no tema atual
   */
  private setCssVariables(theme: ThemeConfig): void {
    const root = document.documentElement;

    // Paleta de cores
    root.style.setProperty('--color-primary', theme.palette.primary);
    root.style.setProperty('--color-secondary', theme.palette.secondary);
    root.style.setProperty('--color-accent', theme.palette.accent);
    root.style.setProperty('--color-success', theme.palette.success);
    root.style.setProperty('--color-warning', theme.palette.warning);
    root.style.setProperty('--color-error', theme.palette.error);
    root.style.setProperty('--color-info', theme.palette.info);

    // Estilos globais
    root.style.setProperty('--color-bg', theme.global.bodyBackground);
    root.style.setProperty('--color-text', theme.global.textColor);
    root.style.setProperty('--color-link', theme.global.linkColor);
    root.style.setProperty('--color-link-hover', theme.global.linkHoverColor);
    root.style.setProperty('--color-border', theme.global.borderColor);
    root.style.setProperty('--color-section-bg', theme.global.sectionBackground);

    // Header
    root.style.setProperty('--header-bg', theme.components.header.background);
    root.style.setProperty('--header-text', theme.components.header.text);
    root.style.setProperty('--header-active', theme.components.header.activeText);
    root.style.setProperty('--header-icon', theme.components.header.iconColor);
    root.style.setProperty('--header-border', theme.components.header.borderBottom);

    // Footer
    root.style.setProperty('--footer-bg', theme.components.footer.background);
    root.style.setProperty('--footer-text', theme.components.footer.text);
    root.style.setProperty('--footer-link', theme.components.footer.linkText);
    root.style.setProperty('--footer-link-hover', theme.components.footer.linkHoverText);
    root.style.setProperty('--footer-border', theme.components.footer.borderTop);

    // Botões
    root.style.setProperty('--btn-bg', theme.components.button.background);
    root.style.setProperty('--btn-text', theme.components.button.text);
    root.style.setProperty('--btn-border', theme.components.button.border);
    root.style.setProperty('--btn-hover-bg', theme.components.button.hoverBackground);
    root.style.setProperty('--btn-hover-text', theme.components.button.hoverText);
    root.style.setProperty('--btn-disabled-bg', theme.components.button.disabledBackground);
    root.style.setProperty('--btn-disabled-text', theme.components.button.disabledText);

    // Cards (unificado para todos os tipos de cards)
    root.style.setProperty('--card-bg', theme.components.card.background);
    root.style.setProperty('--card-text', theme.components.card.text);
    root.style.setProperty('--card-border', theme.components.card.border);
    root.style.setProperty('--card-title', theme.components.card.titleText);
    root.style.setProperty('--card-price', theme.components.card.priceText);
    root.style.setProperty('--card-old-price', theme.components.card.oldPriceText);
    root.style.setProperty('--card-description', theme.components.card.descriptionText);
    root.style.setProperty('--card-tag-bg', theme.components.card.tagBackground);
    root.style.setProperty('--card-tag-text', theme.components.card.tagText);
    root.style.setProperty('--card-shadow', theme.components.card.shadow);
    root.style.setProperty('--card-hover-shadow', theme.components.card.hoverShadow);
    root.style.setProperty('--card-tooltip-bg', theme.components.card.tooltipBackground);
    root.style.setProperty('--card-tooltip-text', theme.components.card.tooltipText);
    root.style.setProperty('--card-overlay-bg', theme.components.card.overlayBackground);
    root.style.setProperty('--card-overlay-text', theme.components.card.overlayText);
    root.style.setProperty('--card-action-text', theme.components.card.actionText);

    // Detalhes do produto
    root.style.setProperty('--product-bg', theme.components.productDetail.background);
    root.style.setProperty('--product-text', theme.components.productDetail.text);
    root.style.setProperty('--product-price', theme.components.productDetail.priceText);
    root.style.setProperty('--product-old-price', theme.components.productDetail.oldPriceText);
    root.style.setProperty('--product-desc-bg', theme.components.productDetail.descriptionBackground);
    root.style.setProperty('--product-desc-text', theme.components.productDetail.descriptionText);

    // Botão de adicionar ao carrinho
    root.style.setProperty('--add-cart-bg', theme.components.productDetail.addToCartButton.background);
    root.style.setProperty('--add-cart-text', theme.components.productDetail.addToCartButton.text);
    root.style.setProperty('--add-cart-border', theme.components.productDetail.addToCartButton.border);
    root.style.setProperty('--add-cart-hover-bg', theme.components.productDetail.addToCartButton.hoverBackground);
    root.style.setProperty('--add-cart-hover-text', theme.components.productDetail.addToCartButton.hoverText);

    // Seletor de cores
    root.style.setProperty('--color-selector-border', theme.components.productDetail.colorSelector.border);
    root.style.setProperty('--color-selector-active', theme.components.productDetail.colorSelector.activeBorder);

    // Seletor de tamanhos
    root.style.setProperty('--size-selector-bg', theme.components.productDetail.sizeSelector.background);
    root.style.setProperty('--size-selector-text', theme.components.productDetail.sizeSelector.text);
    root.style.setProperty('--size-selector-active-bg', theme.components.productDetail.sizeSelector.activeBackground);
    root.style.setProperty('--size-selector-active-text', theme.components.productDetail.sizeSelector.activeText);
    root.style.setProperty('--size-selector-border', theme.components.productDetail.sizeSelector.border);

    // Inputs
    root.style.setProperty('--input-bg', theme.components.input.background);
    root.style.setProperty('--input-text', theme.components.input.text);
    root.style.setProperty('--input-border', theme.components.input.border);

    // Modals
    root.style.setProperty('--modal-bg', theme.components.modal.background);
    root.style.setProperty('--modal-text', theme.components.modal.text);
    root.style.setProperty('--modal-border', theme.components.modal.border);

    root.style.setProperty('--contact-form-bg', theme.components.contactForm.background);
    root.style.setProperty('--contact-form-title', theme.components.contactForm.titleText);
    root.style.setProperty('--contact-form-label', theme.components.contactForm.labelText);
    root.style.setProperty('--contact-form-input-bg', theme.components.contactForm.inputBackground);
    root.style.setProperty('--contact-form-input-text', theme.components.contactForm.inputText);
    root.style.setProperty('--contact-form-input-border', theme.components.contactForm.inputBorder);
    root.style.setProperty('--contact-form-input-focus', theme.components.contactForm.inputFocusBorder);
    root.style.setProperty('--contact-form-btn-bg', theme.components.contactForm.buttonBackground);
    root.style.setProperty('--contact-form-btn-text', theme.components.contactForm.buttonText);
    root.style.setProperty('--contact-form-btn-hover-bg', theme.components.contactForm.buttonHoverBackground);
    root.style.setProperty('--contact-form-btn-hover-text', theme.components.contactForm.buttonHoverText);
    root.style.setProperty('--contact-form-error', theme.components.contactForm.errorText);
    root.style.setProperty('--contact-form-success-bg', theme.components.contactForm.successBackground);
    root.style.setProperty('--contact-form-success', theme.components.contactForm.successText);
    root.style.setProperty('--contact-form-error-bg', theme.components.contactForm.errorBackground);
    root.style.setProperty('--contact-form-icon-bg', theme.components.contactForm.iconBackground);
    root.style.setProperty('--contact-form-icon-color', theme.components.contactForm.iconColor);
    root.style.setProperty('--contact-form-social-bg', theme.components.contactForm.socialIconBackground);
    root.style.setProperty('--contact-form-social-color', theme.components.contactForm.socialIconColor);
    root.style.setProperty('--contact-form-social-hover', theme.components.contactForm.socialIconHoverBackground);

    root.style.setProperty('--faq-bg', theme.components.faq.background);
    root.style.setProperty('--faq-title', theme.components.faq.titleText);
    root.style.setProperty('--faq-question', theme.components.faq.questionText);
    root.style.setProperty('--faq-answer', theme.components.faq.answerText);
    root.style.setProperty('--faq-question-bg', theme.components.faq.questionBackground);
    root.style.setProperty('--faq-answer-bg', theme.components.faq.answerBackground);
    root.style.setProperty('--faq-border', theme.components.faq.border);
    root.style.setProperty('--faq-icon', theme.components.faq.iconColor);
    root.style.setProperty('--faq-icon-active', theme.components.faq.iconActiveColor);
    root.style.setProperty('--faq-hover-bg', theme.components.faq.hoverBackground);
    root.style.setProperty('--faq-active-bg', theme.components.faq.activeBackground);

    root.style.setProperty('--carousel-bg', theme.components.carousel.background);
    root.style.setProperty('--carousel-nav-btn-bg', theme.components.carousel.navigationButtonBackground);
    root.style.setProperty('--carousel-nav-btn-text', theme.components.carousel.navigationButtonText);
    root.style.setProperty('--carousel-nav-btn-hover-bg', theme.components.carousel.navigationButtonHoverBackground);
    root.style.setProperty('--carousel-nav-btn-hover-text', theme.components.carousel.navigationButtonHoverText);
    root.style.setProperty('--carousel-bullet-bg', theme.components.carousel.bulletBackground);
    root.style.setProperty('--carousel-bullet-active-bg', theme.components.carousel.bulletActiveBackground);
    root.style.setProperty('--carousel-item-bg', theme.components.carousel.itemBackground);
    root.style.setProperty('--carousel-fade-start', theme.components.carousel.fadeGradientStart);
    root.style.setProperty('--carousel-fade-end', theme.components.carousel.fadeGradientEnd);
    
  }

  /**
   * Alterna entre os modos de tema (claro, escuro, alto contraste)
   */
  public toggleTheme(mode: ThemeMode): void {
    if (this._currentThemeMode !== mode) {
      this._currentThemeMode = mode;
      this.themeModeSubject.next(mode);
      this.applyTheme();
    }
  }

  /**
   * Muda para um tema de marca específico
   */
  public changeBrand(brandId: string): void {
    if (this.currentBrandId !== brandId) {
      this.currentBrandId = brandId;
      this.applyTheme();
    }
  }

  /**
   * Retorna o modo de tema atual
   */
  public getThemeMode(): ThemeMode {
    return this._currentThemeMode;
  }

  /**
   * Verifica se o modo escuro está ativado
   */
  public getIsDarkMode(): boolean {
    return this._currentThemeMode === 'dark';
  }

  /**
   * Verifica se o modo de alto contraste está ativado
   */
  public getIsHighContrast(): boolean {
    return this._currentThemeMode === 'high-contrast';
  }

  /**
   * Obtém a lista de marcas disponíveis
   */
  public getAvailableBrands(): { id: string, name: string }[] {
    return BRAND_THEMES.map(brand => ({
      id: brand.brandId,
      name: brand.brandName
    }));
  }

  /**
   * Obtém o ID da marca atual
   */
  public getCurrentBrandId(): string {
    return this.currentBrandId;
  }
}