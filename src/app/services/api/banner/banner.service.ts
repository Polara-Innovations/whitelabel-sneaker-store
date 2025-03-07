import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';
import { Banner } from '../../../models/banner.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private apiUrl = `${environment.apiUrl}/banners`;

  constructor(private http: HttpClient) { }

  getBanners(): Observable<Banner[]> {
    return this.http.get<Banner[]>(this.apiUrl)
      .pipe(
        catchError(() => this.getMockedBanners())
      );
  }

  // Método de fallback se a API não estiver disponível
  getMockedBanners(): Observable<Banner[]> {
    const mockedBanners: Banner[] = [
      { imageUrl: 'https://picsum.photos/1200/400?random=22', route: '/route1' },
      { imageUrl: 'https://picsum.photos/1200/400?random=23', route: '/route2' },
      { imageUrl: 'https://picsum.photos/1200/400?random=24', route: '/route3' }
    ];
    
    return of(mockedBanners);
  }
}