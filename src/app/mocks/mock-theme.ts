import { BrandTheme } from "../models/theme-config-model";

export const BRAND_THEMES: BrandTheme[] = [
  {
    brandId: 'default',
    brandName: 'Sneaker Store',
    lightTheme: {
      name: 'Light',
      id: 'light',
      palette: {
        primary: '#4b88c9',
        secondary: '#2c3e50',
        accent: '#e74c3c',
        success: '#2ecc71',
        warning: '#f39c12',
        error: '#e74c3c',
        info: '#3498db'
      },
      global: {
        bodyBackground: '#f8f9fa',
        textColor: '#333333',
        linkColor: '#4b88c9',
        linkHoverColor: '#3a77b8',
        borderColor: '#e0e0e0',
        sectionBackground: '#ffffff',
        scrollbar: {
          track: '#f1f1f1',
          thumb: '#c1c1c1',
          thumbHover: '#a1a1a1',
          width: '8px'
        },
        modal: {
          background: '#ffffff',
          text: '#333333',
          border: '#e0e0e0',
          headerBackground: '#f8f9fa',
          headerText: '#333333',
          bodyBackground: '#ffffff',
          bodyText: '#333333',
          footerBackground: '#f8f9fa',
          shadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
          closeButtonColor: '#666666',
          closeButtonHoverColor: '#333333',
          overlay: 'rgba(0, 0, 0, 0.5)',
          
          info: {
            headerBackground: 'rgba(52, 152, 219, 0.1)',
            iconColor: '#3498db',
            borderColor: '#3498db'
          },
          success: {
            headerBackground: 'rgba(46, 204, 113, 0.1)',
            iconColor: '#2ecc71',
            borderColor: '#2ecc71'
          },
          warning: {
            headerBackground: 'rgba(243, 156, 18, 0.1)',
            iconColor: '#f39c12',
            borderColor: '#f39c12'
          },
          error: {
            headerBackground: 'rgba(231, 76, 60, 0.1)',
            iconColor: '#e74c3c',
            borderColor: '#e74c3c'
          },
          confirm: {
            headerBackground: 'rgba(75, 136, 201, 0.1)',
            iconColor: '#4b88c9',
            borderColor: '#4b88c9'
          },
          
          primaryButton: {
            background: '#4b88c9',
            text: '#ffffff',
            border: 'transparent',
            hoverBackground: '#3a77b8',
            hoverText: '#ffffff',
            disabledBackground: '#cccccc',
            disabledText: '#666666'
          },
          secondaryButton: {
            background: '#f8f9fa',
            text: '#333333',
            border: '#e0e0e0',
            hoverBackground: '#e9ecef',
            hoverText: '#333333',
            disabledBackground: '#f8f9fa',
            disabledText: '#cccccc'
          }
        },        
      },
      components: {
        header: {
          background: '#ffffff',
          text: '#333333',
          activeText: '#4b88c9',
          iconColor: '#4b88c9',
          borderBottom: '#e0e0e0'
        },
        footer: {
          background: '#ffffff',
          text: '#333333',
          linkText: '#4b88c9',
          linkHoverText: '#3498db',
          borderTop: '#e0e0e0'
        },
        button: {
          background: '#4b88c9',
          text: '#ffffff',
          border: 'transparent',
          hoverBackground: '#3a77b8',
          hoverText: '#ffffff',
          disabledBackground: '#cccccc',
          disabledText: '#666666'
        },
        card: {
          background: '#ffffff',
          text: '#666666',
          titleText: '#2c3e50',
          border: '#e0e0e0',
          shadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          hoverShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
          priceText: '#4b88c9',
          oldPriceText: '#999999',
          descriptionText: '#666666',
          tagBackground: '#f8f9fa',
          tagText: '#666666',
          tooltipBackground: 'rgba(0, 0, 0, 0.75)',
          tooltipText: '#ffffff',
          overlayBackground: 'rgba(0, 0, 0, 0.7)',
          overlayText: '#ffffff',
          actionText: '#4b88c9'
        },
        productDetail: {
          background: '#ffffff',
          text: '#333333',
          priceText: '#4b88c9',
          oldPriceText: '#999999',
          descriptionBackground: '#f8f9fa',
          descriptionText: '#666666',
          addToCartButton: {
            background: '#4b88c9',
            text: '#ffffff',
            border: 'transparent',
            hoverBackground: '#3a77b8',
            hoverText: '#ffffff',
            disabledBackground: '#cccccc',
            disabledText: '#666666'
          },
          wishlistButton: {
            background: '#ffffff',
            text: '#4b88c9',
            border: '#4b88c9',
            hoverBackground: '#f8f9fa',
            hoverText: '#3a77b8',
            disabledBackground: '#f8f9fa',
            disabledText: '#cccccc'
          },
          colorSelector: {
            border: '#e0e0e0',
            activeBorder: '#4b88c9'
          },
          sizeSelector: {
            background: '#f8f9fa',
            text: '#333333',
            activeBackground: '#4b88c9',
            activeText: '#ffffff',
            border: '#e0e0e0'
          }
        },
        input: {
          background: '#ffffff',
          text: '#333333',
          border: '#e0e0e0'
        },
        modal: {
          background: '#ffffff',
          text: '#333333',
          border: '#e0e0e0'
        },
        contactForm: {
          background: '#f8f9fa',
          titleText: '#2c3e50',
          labelText: '#495057',
          inputBackground: '#ffffff',
          inputText: '#333333',
          inputBorder: '#ced4da',
          inputFocusBorder: '#4b88c9',
          buttonBackground: '#4b88c9',
          buttonText: '#ffffff',
          buttonHoverBackground: '#3a77b8',
          buttonHoverText: '#ffffff',
          errorText: '#e74c3c',
          successBackground: 'rgba(46, 204, 113, 0.1)',
          successText: '#2ecc71',
          errorBackground: 'rgba(231, 76, 60, 0.1)',
          iconBackground: '#4b88c9',
          iconColor: '#ffffff',
          socialIconBackground: '#4b88c9',
          socialIconColor: '#ffffff',
          socialIconHoverBackground: '#3a77b8'
        },
        faq: {
          background: '#ffffff',
          titleText: '#2c3e50',
          questionText: '#333333',
          answerText: '#666666',
          questionBackground: '#f8f9fa',
          answerBackground: '#ffffff',
          border: '#e0e0e0',
          iconColor: '#4b88c9',
          iconActiveColor: '#3a77b8',
          hoverBackground: '#f8f9fa',
          activeBackground: '#edf2f7'
        },
        carousel: {
          background: 'transparent',
          navigationButtonBackground: '#ffffff',
          navigationButtonText: '#333333',
          navigationButtonHoverBackground: '#4b88c9',
          navigationButtonHoverText: '#ffffff',
          bulletBackground: '#cccccc',
          bulletActiveBackground: '#4b88c9',
          itemBackground: '#ffffff',
          fadeGradientStart: 'rgba(248, 249, 250, 1)',
          fadeGradientEnd: 'rgba(248, 249, 250, 0)'
        },
        aboutUs: {
          background: '#f8f9fa',
          sectionBackground: '#ffffff',
          titleText: '#2c3e50',
          subtitleText: '#4b88c9',
          bodyText: '#666666',
          
          // Seção de equipe
          teamCardBackground: '#ffffff',
          teamCardBorder: '#e0e0e0',
          teamCardShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          teamMemberName: '#2c3e50',
          teamMemberPosition: '#4b88c9',
          teamMemberDescription: '#666666',
          teamSocialIconBackground: '#f0f0f0',
          teamSocialIconColor: '#4b88c9',
          teamSocialIconHoverBackground: '#e0e0e0',
          
          // Seção de missão, visão e valores
          mvvBackground: '#f0f7ff',
          mvvTitleText: '#2c3e50',
          mvvBodyText: '#666666',
          mvvCardBackground: '#ffffff',
          mvvCardBorder: '#e0e0e0',
          mvvCardShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          mvvIconBackground: '#4b88c9',
          mvvIconColor: '#ffffff',
          
          // Seção de conteúdo
          contentBackground: '#ffffff',
          contentTitleText: '#2c3e50',
          contentBodyText: '#666666',
          contentDivider: '#e0e0e0'
        },
      }
    },
    darkTheme: {
      name: 'Dark',
      id: 'dark',
      palette: {
        primary: '#4b88c9',
        secondary: '#2c3e50',
        accent: '#e74c3c',
        success: '#2ecc71',
        warning: '#f39c12',
        error: '#e74c3c',
        info: '#3498db'
      },
      global: {
        bodyBackground: '#121212',
        textColor: '#e0e0e0',
        linkColor: '#64b5f6',
        linkHoverColor: '#90caf9',
        borderColor: '#333333',
        sectionBackground: '#1e1e1e',
        scrollbar: {
          track: '#2d2d2d',
          thumb: '#555555',
          thumbHover: '#777777',
          width: '8px'
        },
        modal: {
          background: '#1e1e1e',
          text: '#e0e0e0',
          border: '#333333',
          headerBackground: '#262626',
          headerText: '#e0e0e0',
          bodyBackground: '#1e1e1e',
          bodyText: '#e0e0e0',
          footerBackground: '#262626',
          shadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
          closeButtonColor: '#bbbbbb',
          closeButtonHoverColor: '#ffffff',
          overlay: 'rgba(0, 0, 0, 0.7)',
          
          info: {
            headerBackground: 'rgba(52, 152, 219, 0.2)',
            iconColor: '#3498db',
            borderColor: '#3498db'
          },
          success: {
            headerBackground: 'rgba(46, 204, 113, 0.2)',
            iconColor: '#2ecc71',
            borderColor: '#2ecc71'
          },
          warning: {
            headerBackground: 'rgba(243, 156, 18, 0.2)',
            iconColor: '#f39c12',
            borderColor: '#f39c12'
          },
          error: {
            headerBackground: 'rgba(231, 76, 60, 0.2)',
            iconColor: '#e74c3c',
            borderColor: '#e74c3c'
          },
          confirm: {
            headerBackground: 'rgba(75, 136, 201, 0.2)',
            iconColor: '#64b5f6',
            borderColor: '#64b5f6'
          },
          
          primaryButton: {
            background: '#4b88c9',
            text: '#ffffff',
            border: 'transparent',
            hoverBackground: '#64b5f6',
            hoverText: '#ffffff',
            disabledBackground: '#424242',
            disabledText: '#757575'
          },
          secondaryButton: {
            background: '#333333',
            text: '#e0e0e0',
            border: '#555555',
            hoverBackground: '#444444',
            hoverText: '#ffffff',
            disabledBackground: '#333333',
            disabledText: '#757575'
          }
        },
      },
      components: {
        header: {
          background: '#1e1e1e',
          text: '#e0e0e0',
          activeText: '#64b5f6',
          iconColor: '#64b5f6',
          borderBottom: '#333333'
        },
        footer: {
          background: '#1e1e1e',
          text: '#e0e0e0',
          linkText: '#bbdefb',
          linkHoverText: '#64b5f6',
          borderTop: '#333333'
        },
        button: {
          background: '#4b88c9',
          text: '#ffffff',
          border: 'transparent',
          hoverBackground: '#64b5f6',
          hoverText: '#ffffff',
          disabledBackground: '#424242',
          disabledText: '#757575'
        },
        card: {
          background: '#1e1e1e',
          text: '#bbbbbb',
          titleText: '#bbdefb',
          border: '#333333',
          shadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
          hoverShadow: '0 10px 15px rgba(0, 0, 0, 0.3)',
          priceText: '#64b5f6',
          oldPriceText: '#9e9e9e',
          descriptionText: '#bbbbbb',
          tagBackground: '#333333',
          tagText: '#e0e0e0',
          tooltipBackground: 'rgba(0, 0, 0, 0.85)',
          tooltipText: '#ffffff',
          overlayBackground: 'rgba(0, 0, 0, 0.8)',
          overlayText: '#ffffff',
          actionText: '#64b5f6'
        },
        productDetail: {
          background: '#1e1e1e',
          text: '#e0e0e0',
          priceText: '#64b5f6',
          oldPriceText: '#9e9e9e',
          descriptionBackground: '#262626',
          descriptionText: '#bbbbbb',
          addToCartButton: {
            background: '#4b88c9',
            text: '#ffffff',
            border: 'transparent',
            hoverBackground: '#64b5f6',
            hoverText: '#ffffff',
            disabledBackground: '#424242',
            disabledText: '#757575'
          },
          wishlistButton: {
            background: '#1e1e1e',
            text: '#64b5f6',
            border: '#64b5f6',
            hoverBackground: '#262626',
            hoverText: '#90caf9',
            disabledBackground: '#262626',
            disabledText: '#616161'
          },
          colorSelector: {
            border: '#333333',
            activeBorder: '#64b5f6'
          },
          sizeSelector: {
            background: '#262626',
            text: '#e0e0e0',
            activeBackground: '#4b88c9',
            activeText: '#ffffff',
            border: '#333333'
          }
        },
        input: {
          background: '#262626',
          text: '#e0e0e0',
          border: '#333333'
        },
        modal: {
          background: '#1e1e1e',
          text: '#e0e0e0',
          border: '#333333'
        },
        contactForm: {
          background: '#1e1e1e',
          titleText: '#bbdefb',
          labelText: '#e0e0e0',
          inputBackground: '#262626',
          inputText: '#e0e0e0',
          inputBorder: '#333333',
          inputFocusBorder: '#64b5f6',
          buttonBackground: '#4b88c9',
          buttonText: '#ffffff',
          buttonHoverBackground: '#64b5f6',
          buttonHoverText: '#ffffff',
          errorText: '#e74c3c',
          successBackground: 'rgba(46, 204, 113, 0.1)',
          successText: '#2ecc71',
          errorBackground: 'rgba(231, 76, 60, 0.1)',
          iconBackground: '#4b88c9',
          iconColor: '#ffffff',
          socialIconBackground: '#4b88c9',
          socialIconColor: '#ffffff',
          socialIconHoverBackground: '#64b5f6'
        },
        faq: {
          background: '#1e1e1e',
          titleText: '#bbdefb',
          questionText: '#e0e0e0',
          answerText: '#bbbbbb',
          questionBackground: '#262626',
          answerBackground: '#1e1e1e',
          border: '#333333',
          iconColor: '#64b5f6',
          iconActiveColor: '#90caf9',
          hoverBackground: '#262626',
          activeBackground: '#333333'
        },
        carousel: {
          background: 'transparent',
          navigationButtonBackground: '#262626',
          navigationButtonText: '#e0e0e0',
          navigationButtonHoverBackground: '#4b88c9',
          navigationButtonHoverText: '#ffffff',
          bulletBackground: '#555555',
          bulletActiveBackground: '#64b5f6',
          itemBackground: '#1e1e1e',
          fadeGradientStart: 'rgba(18, 18, 18, 1)',
          fadeGradientEnd: 'rgba(18, 18, 18, 0)'
        },
        aboutUs: {
          background: '#121212',
          sectionBackground: '#1e1e1e',
          titleText: '#bbdefb',
          subtitleText: '#64b5f6',
          bodyText: '#bbbbbb',
          
          // Seção de equipe
          teamCardBackground: '#262626',
          teamCardBorder: '#333333',
          teamCardShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
          teamMemberName: '#bbdefb',
          teamMemberPosition: '#64b5f6',
          teamMemberDescription: '#bbbbbb',
          teamSocialIconBackground: '#333333',
          teamSocialIconColor: '#64b5f6',
          teamSocialIconHoverBackground: '#444444',
          
          // Seção de missão, visão e valores
          mvvBackground: '#1a2635',
          mvvTitleText: '#bbdefb',
          mvvBodyText: '#bbbbbb',
          mvvCardBackground: '#262626',
          mvvCardBorder: '#333333',
          mvvCardShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
          mvvIconBackground: '#4b88c9',
          mvvIconColor: '#ffffff',
          
          // Seção de conteúdo
          contentBackground: '#1e1e1e',
          contentTitleText: '#bbdefb',
          contentBodyText: '#bbbbbb',
          contentDivider: '#333333'
        },
      }
    },
    highContrastTheme: {
      name: 'High Contrast',
      id: 'high-contrast',
      palette: {
        primary: '#ffff00',
        secondary: '#ffffff',
        accent: '#00ffff',
        success: '#00ff00',
        warning: '#ffff00',
        error: '#ff0000',
        info: '#00ffff'
      },
      global: {
        bodyBackground: '#000000',
        textColor: '#ffffff',
        linkColor: '#ffff00',
        linkHoverColor: '#00ffff',
        borderColor: '#ffffff',
        sectionBackground: '#000000',
        scrollbar: {
          track: '#000000',
          thumb: '#ffff00',
          thumbHover: '#00ffff',
          width: '10px'
        },
        modal: {
          background: '#000000',
          text: '#ffffff',
          border: '#ffffff',
          headerBackground: '#000000',
          headerText: '#ffff00',
          bodyBackground: '#000000',
          bodyText: '#ffffff',
          footerBackground: '#000000',
          shadow: '0 0 0 2px #ffffff',
          closeButtonColor: '#ffffff',
          closeButtonHoverColor: '#ffff00',
          overlay: 'rgba(0, 0, 0, 0.9)',
          
          info: {
            headerBackground: '#000000',
            iconColor: '#00ffff',
            borderColor: '#00ffff'
          },
          success: {
            headerBackground: '#000000',
            iconColor: '#00ff00',
            borderColor: '#00ff00'
          },
          warning: {
            headerBackground: '#000000',
            iconColor: '#ffff00',
            borderColor: '#ffff00'
          },
          error: {
            headerBackground: '#000000',
            iconColor: '#ff0000',
            borderColor: '#ff0000'
          },
          confirm: {
            headerBackground: '#000000',
            iconColor: '#ffff00',
            borderColor: '#ffff00'
          },
          
          primaryButton: {
            background: '#000000',
            text: '#ffff00',
            border: '#ffff00',
            hoverBackground: '#ffff00',
            hoverText: '#000000',
            disabledBackground: '#333333',
            disabledText: '#999999'
          },
          secondaryButton: {
            background: '#000000',
            text: '#ffffff',
            border: '#ffffff',
            hoverBackground: '#ffffff',
            hoverText: '#000000',
            disabledBackground: '#333333',
            disabledText: '#999999'
          }
        },
      },
      components: {
        header: {
          background: '#000000',
          text: '#ffffff',
          activeText: '#ffff00',
          iconColor: '#ffff00',
          borderBottom: '#ffffff'
        },
        footer: {
          background: '#000000',
          text: '#ffffff',
          linkText: '#ffff00',
          linkHoverText: '#00ffff',
          borderTop: '#ffffff'
        },
        button: {
          background: '#000000',
          text: '#ffff00',
          border: '#ffff00',
          hoverBackground: '#ffff00',
          hoverText: '#000000',
          disabledBackground: '#333333',
          disabledText: '#999999'
        },
        card: {
          background: '#000000',
          text: '#ffffff',
          titleText: '#ffff00',
          border: '#ffffff',
          shadow: '0 0 0 2px #ffffff',
          hoverShadow: '0 0 0 3px #ffff00',
          priceText: '#00ffff',
          oldPriceText: '#999999',
          descriptionText: '#ffffff',
          tagBackground: '#000000',
          tagText: '#ffff00',
          tooltipBackground: '#000000',
          tooltipText: '#ffff00',
          overlayBackground: 'rgba(0, 0, 0, 0.9)',
          overlayText: '#ffffff',
          actionText: '#ffff00'
        },
        productDetail: {
          background: '#000000',
          text: '#ffffff',
          priceText: '#00ffff',
          oldPriceText: '#999999',
          descriptionBackground: '#000000',
          descriptionText: '#ffffff',
          addToCartButton: {
            background: '#000000',
            text: '#ffff00',
            border: '#ffff00',
            hoverBackground: '#ffff00',
            hoverText: '#000000',
            disabledBackground: '#333333',
            disabledText: '#999999'
          },
          wishlistButton: {
            background: '#000000',
            text: '#00ffff',
            border: '#00ffff',
            hoverBackground: '#00ffff',
            hoverText: '#000000',
            disabledBackground: '#333333',
            disabledText: '#999999'
          },
          colorSelector: {
            border: '#ffffff',
            activeBorder: '#ffff00'
          },
          sizeSelector: {
            background: '#000000',
            text: '#ffffff',
            activeBackground: '#ffff00',
            activeText: '#000000',
            border: '#ffffff'
          }
        },
        input: {
          background: '#000000',
          text: '#ffffff',
          border: '#ffffff'
        },
        modal: {
          background: '#000000',
          text: '#ffffff',
          border: '#ffffff'
        },
        contactForm: {
          background: '#000000',
          titleText: '#ffff00',
          labelText: '#ffffff',
          inputBackground: '#000000',
          inputText: '#ffffff',
          inputBorder: '#ffffff',
          inputFocusBorder: '#ffff00',
          buttonBackground: '#000000',
          buttonText: '#ffff00',
          buttonHoverBackground: '#ffff00',
          buttonHoverText: '#000000',
          errorText: '#ff0000',
          successBackground: '#000000',
          successText: '#00ff00',
          errorBackground: '#000000',
          iconBackground: '#ffff00',
          iconColor: '#000000',
          socialIconBackground: '#ffff00',
          socialIconColor: '#000000',
          socialIconHoverBackground: '#00ffff'
        },
        faq: {
          background: '#000000',
          titleText: '#ffff00',
          questionText: '#ffffff',
          answerText: '#ffffff',
          questionBackground: '#000000',
          answerBackground: '#000000',
          border: '#ffffff',
          iconColor: '#ffff00',
          iconActiveColor: '#00ffff',
          hoverBackground: '#333333',
          activeBackground: '#444444'
        },
        carousel: {
          background: 'transparent',
          navigationButtonBackground: '#000000',
          navigationButtonText: '#ffff00',
          navigationButtonHoverBackground: '#ffff00',
          navigationButtonHoverText: '#000000',
          bulletBackground: '#555555',
          bulletActiveBackground: '#ffff00',
          itemBackground: '#000000',
          fadeGradientStart: 'rgba(0, 0, 0, 1)',
          fadeGradientEnd: 'rgba(0, 0, 0, 0)'
        },
        aboutUs: {
          background: '#000000',
          sectionBackground: '#000000',
          titleText: '#ffff00',
          subtitleText: '#00ffff',
          bodyText: '#ffffff',
          
          // Seção de equipe
          teamCardBackground: '#000000',
          teamCardBorder: '#ffffff',
          teamCardShadow: '0 0 0 2px #ffffff',
          teamMemberName: '#ffff00',
          teamMemberPosition: '#00ffff',
          teamMemberDescription: '#ffffff',
          teamSocialIconBackground: '#000000',
          teamSocialIconColor: '#ffff00',
          teamSocialIconHoverBackground: '#ffff00',
          
          // Seção de missão, visão e valores
          mvvBackground: '#000000',
          mvvTitleText: '#ffff00',
          mvvBodyText: '#ffffff',
          mvvCardBackground: '#000000',
          mvvCardBorder: '#ffffff',
          mvvCardShadow: '0 0 0 2px #ffffff',
          mvvIconBackground: '#ffff00',
          mvvIconColor: '#000000',
          
          // Seção de conteúdo
          contentBackground: '#000000',
          contentTitleText: '#ffff00',
          contentBodyText: '#ffffff',
          contentDivider: '#ffffff'
        },
      }
    }
  }
];

export const DEFAULT_BRAND_ID = 'default';