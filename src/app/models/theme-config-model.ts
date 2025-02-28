  export interface ColorPalette {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  }

  export interface ComponentColors {
    background: string;
    text: string;
    border: string;
  }

  export interface ButtonColors {
    background: string;
    text: string;
    border: string;
    hoverBackground: string;
    hoverText: string;
    disabledBackground: string;
    disabledText: string;
  }

  export interface CardColors {
    background: string;
    text: string;
    titleText: string;
    border: string;
    shadow: string;
    hoverShadow: string;
    priceText: string;
    oldPriceText: string;
    descriptionText: string;
    tagBackground: string;
    tagText: string;
    tooltipBackground: string;
    tooltipText: string;
    overlayBackground: string;
    overlayText: string;
    actionText: string;
  }

  export interface HeaderColors {
    background: string;
    text: string;
    activeText: string;
    iconColor: string;
    borderBottom: string;
  }

  export interface FooterColors {
    background: string;
    text: string;
    linkText: string;
    linkHoverText: string;
    borderTop: string;
  }

  export interface ProductDetailColors {
    background: string;
    text: string;
    priceText: string;
    oldPriceText: string;
    descriptionBackground: string;
    descriptionText: string;
    addToCartButton: ButtonColors;
    wishlistButton: ButtonColors;
    colorSelector: {
      border: string;
      activeBorder: string;
    };
    sizeSelector: {
      background: string;
      text: string;
      activeBackground: string;
      activeText: string;
      border: string;
    };
  }

  export interface ContactFormColors {
    background: string;
    titleText: string;
    labelText: string;
    inputBackground: string;
    inputText: string;
    inputBorder: string;
    inputFocusBorder: string;
    buttonBackground: string;
    buttonText: string;
    buttonHoverBackground: string;
    buttonHoverText: string;
    errorText: string;
    successBackground: string;
    successText: string;
    errorBackground: string;
    iconBackground: string;
    iconColor: string;
    socialIconBackground: string;
    socialIconColor: string;
    socialIconHoverBackground: string;
  }

  export interface ThemeConfig {
    name: string;
    id: string;
    palette: ColorPalette;
    global: {
      bodyBackground: string;
      textColor: string;
      linkColor: string;
      linkHoverColor: string;
      borderColor: string;
      sectionBackground: string;
    };
    components: {
      header: HeaderColors;
      footer: FooterColors;
      button: ButtonColors;
      card: CardColors;
      productDetail: ProductDetailColors;
      input: ComponentColors;
      modal: ComponentColors;
      contactForm: ContactFormColors;
    };
  }

  export interface BrandTheme {
    brandId: string;
    brandName: string;
    lightTheme: ThemeConfig;
    darkTheme: ThemeConfig;
    highContrastTheme: ThemeConfig;
  }