import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { FooterConfig } from '../../../models/footer.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  private apiUrl = `${environment.apiUrl}footer`;
  private footerConfigSubject = new BehaviorSubject<FooterConfig | null>(null);
  public footerConfig$ = this.footerConfigSubject.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Carrega a configuração do footer do servidor
   */
  loadFooterConfig(): Observable<FooterConfig> {
    return this.http.get<FooterConfig>(this.apiUrl).pipe(
      tap(config => {
        // Ordenar as seções pela propriedade order
        config.sections = config.sections
          .filter(section => section.enabled)
          .sort((a, b) => a.order - b.order);
        
        this.footerConfigSubject.next(config);
      }),
      catchError(error => {
        console.error('Erro ao carregar configuração do footer:', error);
        return of(this.getDefaultConfig());
      })
    );
  }

  /**
   * Retorna uma configuração padrão caso a API falhe
   */
  private getDefaultConfig(): FooterConfig {
    return {
      id: 'default',
      companyName: 'Sneaker Store',
      showCopyright: true,
      sections: [
        {
          id: 'about',
          title: 'Sobre Nós',
          type: 'links',
          enabled: true,
          order: 1,
          content: {
            links: [
              { id: 'about1', label: 'Nossa História', url: '/sobre-nos' },
              { id: 'about2', label: 'Equipe', url: '/equipe' },
              { id: 'about3', label: 'Trabalhe Conosco', url: '/carreiras' },
              { id: 'about4', label: 'Blog', url: '/blog' }
            ]
          }
        },
        {
          id: 'contact',
          title: 'Contato',
          type: 'contact',
          enabled: true,
          order: 2,
          content: {
            address: 'Rua Exemplo, 123 - São Paulo, SP',
            phone: '(11) 9999-9999',
            email: 'contato@sneakerstore.com',
            showIcons: true,
            contactFormLink: '/contato'
          }
        },
        {
          id: 'social',
          title: 'Redes Sociais',
          type: 'social',
          enabled: true,
          order: 3,
          content: {
            showLabels: false,
            links: [
              { id: 'social1', label: 'Instagram', url: 'https://instagram.com', external: true, platform: 'instagram', icon: 'fab fa-instagram' },
              { id: 'social2', label: 'Facebook', url: 'https://facebook.com', external: true, platform: 'facebook', icon: 'fab fa-facebook-f' },
              { id: 'social3', label: 'Twitter', url: 'https://twitter.com', external: true, platform: 'twitter', icon: 'fab fa-twitter' }
            ]
          }
        },
        {
          id: 'newsletter',
          title: 'Newsletter',
          type: 'newsletter',
          enabled: true,
          order: 4,
          content: {
            placeholder: 'Seu e-mail',
            buttonText: 'Assinar',
            description: 'Receba novidades e promoções exclusivas',
            termsText: 'Ao assinar, você concorda com nossa Política de Privacidade'
          }
        },
        {
          id: 'payment',
          title: 'Formas de Pagamento',
          type: 'payment',
          enabled: true,
          order: 5,
          content: {
            showLabels: false,
            methods: [
              { id: 'pay1', name: 'Visa', icon: 'fab fa-cc-visa', type: 'card' },
              { id: 'pay2', name: 'Mastercard', icon: 'fab fa-cc-mastercard', type: 'card' },
              { id: 'pay3', name: 'PayPal', icon: 'fab fa-paypal', type: 'other' },
              { id: 'pay4', name: 'Pix', icon: 'fas fa-qrcode', type: 'pix' }
            ]
          }
        }
      ],
      bottomLinks: [
        { id: 'terms', label: 'Termos de Uso', url: '/termos' },
        { id: 'privacy', label: 'Política de Privacidade', url: '/privacidade' },
        { id: 'cookies', label: 'Cookies', url: '/cookies' }
      ]
    };
  }
}