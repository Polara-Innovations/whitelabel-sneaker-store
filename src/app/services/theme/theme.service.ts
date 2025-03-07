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
  private themeTypeSubject = new BehaviorSubject<string>('light');
  private apiUrl = `${environment.apiUrl}`;
  
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
        const storedThemeType = this.themeTypeSubject.value; 
        const theme = themes.find(t => t.type === storedThemeType) || themes[0]; 
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
    this.themeTypeSubject.next(theme.type); 
    
    // Aplicar cores globais
    this.setCssVariablesFlat(theme.global, 'global-color');

    // Aplicar cores para cada componente
    Object.keys(theme.components).forEach(componentName => {
      const componentColors = theme.components[componentName];
      this.setCssVariablesNested(componentColors, componentName);
    });
  }

  /**
   * Define variáveis CSS para objetos aninhados, com suporte à hierarquia
   */
  private setCssVariablesNested(variables: any, prefix: string, path: string = ''): void {
    const root = document.documentElement;

    if (variables && typeof variables === 'object') {
      for (const key in variables) {
        if (variables.hasOwnProperty(key)) {
          const value = variables[key];
          const newPath = path ? `${path}-${key}` : key;
          
          if (value !== null && typeof value === 'object') {
            this.setCssVariablesNested(value, prefix, newPath);
          } else if (value !== null) {
            root.style.setProperty(`--${prefix}-${newPath}`, value);
          }
        }
      }
    }
  }

  /**
   * Define variáveis CSS para objetos planos (sem aninhamento)
   */
  private setCssVariablesFlat(variables: Record<string, any>, prefix: string): void {
    const root = document.documentElement;

    if (variables) {
      for (const key in variables) {
        if (variables.hasOwnProperty(key)) {
          const value = variables[key];
          if (value !== null) {
            root.style.setProperty(`--${prefix}-${key}`, value);
          }
        }
      }
    }
  }

  private applyLayout(layout: LayoutConfig): void {
    this.layoutSubject.next(layout);
    this.setCssVariablesFlat(layout.spacing, 'spacing');
    this.setCssVariablesFlat(layout.font.size, 'font-size');
    this.setCssVariablesFlat(layout.font.weight, 'font-weight');
    this.setCssVariablesFlat(layout.borderRadius, 'border-radius');
    this.setCssVariablesFlat(layout.boxShadow, 'box-shadow');
    this.setCssVariablesFlat(layout.margin, 'margin');
    this.setCssVariablesFlat(layout.padding, 'padding');
    this.setCssVariablesFlat(layout.animation.duration, 'animation-duration');
    this.setCssVariablesFlat(layout.animation.easing, 'animation-easing');
    this.setCssVariablesFlat(layout.iconSize, 'icon-size');
    this.setCssVariablesFlat(layout.opacity, 'opacity');
  }

  public changeTheme(type: string): void {
    this.getAvailableThemes().subscribe(themes => {
      let theme: ThemeConfig | undefined;
      
      if (['light', 'dark', 'high-contrast'].includes(type)) {
        theme = themes.find(t => t.type === type);
      } else {
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
  
  public clearThemeCache(): void {
    this.availableThemesCache$ = null;
  }
}