import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MenuConfig } from '../../../models/menu-config.model';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService{

  private readonly apiUrl = `${environment.apiUrl}/menus`;
 private menuConfigSubject = new BehaviorSubject<MenuConfig | null>(null);
  public menuConfig$ = this.menuConfigSubject.asObservable();

  constructor(private http: HttpClient) { }

    /**
     * Carrega a configuração do menu do servidor
     */
    loadMenuConfig(): Observable<MenuConfig> {
      return this.http.get<MenuConfig>(this.apiUrl).pipe(
        tap(config => {
          this.menuConfigSubject.next(config);
        }),
        catchError(error => {
          console.error('Erro ao carregar configuração do menu:', error);
          return of(this.getDefaultConfig());
        })
      );
      }
    
      /**
       * Retorna a configuração padrão do menu
       */
      private getDefaultConfig(): MenuConfig {
        return {
        } as MenuConfig;
      }
}
