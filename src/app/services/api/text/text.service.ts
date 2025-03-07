import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextService{

  private readonly apiUrl = `${environment.apiUrl}/texts`;
 private textConfigSubject = new BehaviorSubject<any>(null);
  public textConfig$ = this.textConfigSubject.asObservable();

  constructor(private http: HttpClient) { }

    /**
     * Carrega a configuração do texto do servidor
     */
    loadTextConfig(): Observable<any> {
      return this.http.get<any>(this.apiUrl).pipe(
        tap(config => {
          this.textConfigSubject.next(config);
        }),
        catchError(error => {
          console.error('Erro ao carregar configuração do texto:', error);
          return of(this.getDefaultConfig());
        })
      );
      }
    
      /**
       * Retorna a configuração padrão do texto
       */
      private getDefaultConfig(): any {
        return {
        } as any;
      }
}
