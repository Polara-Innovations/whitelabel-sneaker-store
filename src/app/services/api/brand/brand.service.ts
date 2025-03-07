import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';
import { Brand } from '../../../models/brand.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private apiUrl = `${environment.apiUrl}/brands`;

  constructor(private http: HttpClient) { }

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.apiUrl)
      .pipe(
        catchError(() => this.getMockedBrands())
      );
  }

  // Método de fallback se a API não estiver disponível
  getMockedBrands(): Observable<Brand[]> {
    const mockedBrands: Brand[] = [
      {
        name: 'Samsung',
        imageUrl: 'https://picsum.photos/400/300?random=13'
      },
      {
        name: 'Apple',
        imageUrl: 'https://picsum.photos/400/300?random=14'
      },
      {
        name: 'Motorola',
        imageUrl: 'https://picsum.photos/400/300?random=15'
      },
      {
        name: 'Xiaomi',
        imageUrl: 'https://picsum.photos/400/300?random=16'
      },
      {
        name: 'Sony',
        imageUrl: 'https://picsum.photos/400/300?random=17'
      },
      {
        name: 'OnePlus',
        imageUrl: 'https://picsum.photos/400/300?random=18'
      },
      {
        name: 'Google',
        imageUrl: 'https://picsum.photos/400/300?random=19'
      }
    ];
    
    return of(mockedBrands);
  }
}