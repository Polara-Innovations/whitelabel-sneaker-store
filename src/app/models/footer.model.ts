export interface FooterLink {
    id: string;
    label: string;
    url: string;
    external?: boolean; // Se true, abre em nova aba
    icon?: string; // Opcional, para ícones
  }
  
  export interface SocialLink extends FooterLink {
    platform: string; // ex: 'facebook', 'twitter', etc.
  }
  
  export interface PaymentMethod {
    id: string;
    name: string;
    icon: string; // Classe do ícone ou URL da imagem
    type: 'card' | 'pix' | 'bank' | 'other';
  }
  
  export interface FooterSection {
    id: string;
    title: string;
    type: 'links' | 'social' | 'newsletter' | 'contact' | 'payment' | 'text' | 'custom';
    enabled: boolean;
    order: number; // Para ordenar as seções
    content: any; // Conteúdo específico para cada tipo
  }
  
  export interface FooterConfig {
    id: string;
    companyName: string;
    logo?: string;
    sections: FooterSection[];
    copyrightText?: string;
    showCopyright: boolean;
    bottomLinks?: FooterLink[];
  }
  
  // Tipos específicos de conteúdo
  export interface LinksContent {
    links: FooterLink[];
  }
  
  export interface SocialContent {
    links: SocialLink[];
    showLabels?: boolean;
  }
  
  export interface NewsletterContent {
    placeholder?: string;
    buttonText?: string;
    description?: string;
    termsText?: string;
  }
  
  export interface ContactContent {
    address?: string;
    phone?: string;
    email?: string;
    showIcons?: boolean;
    contactFormLink?: string;
  }
  
  export interface PaymentContent {
    methods: PaymentMethod[];
    showLabels?: boolean;
  }
  
  export interface TextContent {
    html: string; // Conteúdo HTML
  }