import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ComponentColors, ThemeConfig } from '../../models/theme-config-model';
import { LayoutConfig } from '../../models/layout-config.model';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { catchError, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<ThemeConfig | null>(null);
  private layoutSubject = new BehaviorSubject<LayoutConfig | null>(null);
  private themeTypeSubject = new BehaviorSubject<string>('light'); // Padrão para 'light'
  private apiUrl = `${environment.apiUrl}`;
  
  // Cache para temas disponíveis
  private availableThemesCache$: Observable<ThemeConfig[]> | null = null;

  currentTheme = this.themeSubject.asObservable();
  currentLayout = this.layoutSubject.asObservable();
  currentThemeType = this.themeTypeSubject.asObservable();

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
    this.initializeThemeType();
    this.loadTheme();
    this.loadLayout();
  }

  /**
   * Retorna todos os temas disponíveis
   * @returns Observable com array de temas
   */
  getAvailableThemes(): Observable<ThemeConfig[]> {
    // Utiliza cache para evitar múltiplas requisições desnecessárias
    if (!this.availableThemesCache$) {
      this.availableThemesCache$ = this.http.get<ThemeConfig[]>(`${this.apiUrl}/themes`)
        .pipe(
          shareReplay(1),
          catchError(error => {
            console.error('Erro ao obter temas disponíveis:', error);
            return [];
          })
        );
    }
    return this.availableThemesCache$;
  }

  private initializeThemeType(): void {
    const storedThemeType = this.localStorageService.getItem('themeType') || 'light';
    this.themeTypeSubject.next(storedThemeType);
  }

  private loadTheme(): void {
    this.getAvailableThemes().subscribe(
      themes => {
        const storedThemeType = this.themeTypeSubject.value; // Obtendo o tema armazenado
        const theme = themes.find(t => t.type === storedThemeType) || themes[0]; // Seleciona o tema correspondente ou o primeiro
        this.applyTheme(theme);
      },
      error => {
        console.error('Error loading themes:', error);
      }
    );
  }

  private loadLayout(): void {
    this.http.get<LayoutConfig[]>(`${this.apiUrl}/layouts`).subscribe(
      layouts => {
        const layout = layouts[0] || null; 
        this.applyLayout(layout);
      },
      error => {
        console.error('Error loading layout:', error);
      }
    );
  }

  private applyTheme(theme: ThemeConfig): void {
    this.themeSubject.next(theme);
    this.themeTypeSubject.next(theme.type); // Atualiza o tipo de tema atual
    this.setCssVariables(theme.global, 'global-color');

    Object.keys(theme.components).forEach(componentName => {
      const componentColors = theme.components[componentName];
      this.setCssVariables(componentColors, componentName);
    });
  }

  private applyLayout(layout: LayoutConfig): void {
    this.layoutSubject.next(layout);
    this.setCssVariables(layout.spacing, 'spacing');
    this.setCssVariables(layout.font.size, 'font-size');
    this.setCssVariables(layout.font.weight, 'font-weight');
    this.setCssVariables(layout.borderRadius, 'border-radius');
    this.setCssVariables(layout.boxShadow, 'box-shadow');
    this.setCssVariables(layout.margin, 'margin');
    this.setCssVariables(layout.padding, 'padding');
    this.setCssVariables(layout.animation.duration, 'animation-duration');
    this.setCssVariables(layout.animation.easing, 'animation-easing');
    this.setCssVariables(layout.iconSize, 'icon-size');
    this.setCssVariables(layout.opacity, 'opacity');
  }

  private setCssVariables(variables: Record<string, any>, prefix: string): void {
    const root = document.documentElement;

    if (variables) {
      for (const key in variables) {
        if (variables.hasOwnProperty(key)) {
          const value = variables[key];
          root.style.setProperty(`--${prefix}-${key}`, value);
        }
      }
    }
  }

  public changeTheme(type: string): void {
    // Determina se o argumento é um ID ou um tipo de tema
    this.getAvailableThemes().subscribe(themes => {
      let theme: ThemeConfig | undefined;
      
      // Verifica se o argumento é um tipo de tema (light, dark, high-contrast)
      if (['light', 'dark', 'high-contrast'].includes(type)) {
        theme = themes.find(t => t.type === type);
      } else {
        // Caso contrário, assume que é um ID
        theme = themes.find(t => t.type === type);
      }
      
      if (theme) {
        this.localStorageService.setItem('themeType', theme.type);
        this.applyTheme(theme);
      } else {
        console.error(`Tema não encontrado: ${type}`);
      }
    });
  }

  public changeLayout(layoutId: string): void {
    this.http.get<LayoutConfig>(`${this.apiUrl}/layouts/${layoutId}`).subscribe(
      layout => {
        this.applyLayout(layout);
      },
      error => {
        console.error('Error changing layout:', error);
      }
    );
  }
  
  // Método para limpar o cache de temas (útil para testes ou atualizações forçadas)
  public clearThemeCache(): void {
    this.availableThemesCache$ = null;
  }
}