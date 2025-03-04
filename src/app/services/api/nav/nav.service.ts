import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavCategory } from '../../../models/nav-category.model';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NavService {
  private apiUrl = `${environment.apiUrl}`;
  
  constructor(private http: HttpClient) {}
  
  getCategories(): Observable<NavCategory[]> {
    return this.http.get<NavCategory[]>(`${this.apiUrl}nav-categories`).pipe(
      catchError(() => this.getMockedCategories())
    );
  }
  
  getTags(): Observable<NavCategory[]> {
    return this.http.get<NavCategory[]>(`${this.apiUrl}nav-tags`).pipe(
      catchError(() => this.getMockedTags())
    );
  }
  
  getMockedCategories(): Observable<NavCategory[]> {
    const categories: NavCategory[] = [
      {
        id: 'running',
        name: 'Corrida',
        subcategories: [
          { id: 'road', name: 'Asfalto', route: '/products?category=Corrida&tag=Asfalto' },
          { id: 'trail', name: 'Trilha', route: '/products?category=Corrida&tag=Trilha' },
          { id: 'marathon', name: 'Maratona', route: '/products?category=Corrida&tag=Maratona' }
        ]
      },
      {
        id: 'basketball',
        name: 'Basquete',
        subcategories: [
          { id: 'indoor', name: 'Indoor', route: '/products?category=Basquete&tag=Indoor' },
          { id: 'outdoor', name: 'Outdoor', route: '/products?category=Basquete&tag=Outdoor' }
        ]
      },
    ];
    
    return of(categories);
  }
  
  getMockedTags(): Observable<NavCategory[]> {
    const tags: NavCategory[] = [
      {
        id: 'brands',
        name: 'Marcas',
        subcategories: [
          { id: 'nike', name: 'Nike', route: '/products?tag=Nike' },
          { id: 'adidas', name: 'Adidas', route: '/products?tag=Adidas' },
          { id: 'puma', name: 'Puma', route: '/products?tag=Puma' },
          { id: 'reebok', name: 'Reebok', route: '/products?tag=Reebok' },
          { id: 'newbalance', name: 'New Balance', route: '/products?tag=NewBalance' }
        ]
      },
      {
        id: 'styles',
        name: 'Estilos',
        subcategories: [
          { id: 'casual', name: 'Casual', route: '/products?tag=Casual' },
          { id: 'sport', name: 'Esportivo', route: '/products?tag=Esportivo' },
          { id: 'retro', name: 'Retrô', route: '/products?tag=Retro' }
        ]
      },
    ];
    
    return of(tags);
  }
}