import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../../models/product.model';
import { ProductsFilter } from '../../../models/filter.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getProducts(filter?: ProductsFilter): Observable<{products: Product[], total: number}> {
    let params = new HttpParams();
    
    // Adicionar parâmetros de filtragem
    if (filter) {
      if (filter.search) {
        params = params.set('q', filter.search);
      }
      
      if (filter.page && filter.limit) {
        params = params.set('_page', filter.page.toString());
        params = params.set('_limit', filter.limit.toString());
      }
      
      if (filter.sort) {
        switch (filter.sort) {
          case 'priceAsc':
            params = params.set('_sort', 'price');
            params = params.set('_order', 'asc');
            break;
          case 'priceDesc':
            params = params.set('_sort', 'price');
            params = params.set('_order', 'desc');
            break;
          case 'nameAsc':
            params = params.set('_sort', 'title');
            params = params.set('_order', 'asc');
            break;
          case 'nameDesc':
            params = params.set('_sort', 'title');
            params = params.set('_order', 'desc');
            break;
          case 'newest':
            params = params.set('_sort', 'createdAt');
            params = params.set('_order', 'desc');
            break;
        }
      }
    }
    
    return this.http.get<Product[]>(this.apiUrl, {
      params,
      observe: 'response'
    }).pipe(
      map(response => {
        return {
          products: response.body as Product[],
          total: parseInt(response.headers.get('X-Total-Count') || '0', 10)
        };
      })
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}