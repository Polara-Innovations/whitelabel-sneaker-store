import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';
import { Category } from '../../../models/category.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl)
      .pipe(
        catchError(() => this.getMockedCategories())
      );
  }

  // Método de fallback se a API não estiver disponível
  getMockedCategories(): Observable<Category[]> {
    const mockedCategories: Category[] = [
      { name: 'Roupas', imageUrl: 'https://picsum.photos/400/300?random=19'},
      { name: 'Calçados', imageUrl: 'https://picsum.photos/400/300?random=20' },
      { name: 'Acessórios', imageUrl: 'https://picsum.photos/400/300?random=21'},
      { name: 'Eletrônicos', imageUrl: 'https://picsum.photos/400/300?random=22'}
    ];
    
    return of(mockedCategories);
  }
}