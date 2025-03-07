import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { faqResponse, faqSection } from '../../../models/faq.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  private apiUrl = `${environment.apiUrl}/faq`;

  constructor(private http: HttpClient) {}

  /**
   * Obtém os dados de faq da API
   */
  getfaq(): Observable<faqResponse> {
    return this.http.get<faqResponse>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Erro ao carregar os dados do faq:', error);
        // Retornar dados vazios em caso de erro
        return of({
          title: 'Perguntas Frequentes',
          sections: []
        });
      })
    );
  }

  /**
   * Obtém uma seção específica do faq
   * @param sectionId ID da seção
   */
  getfaqSection(sectionId: string): Observable<faqSection | undefined> {
    return this.getfaq().pipe(
      map(response => response.sections.find(section => section.id === sectionId))
    );
  }

  /**
   * Pesquisa perguntas do faq com base em um termo de pesquisa
   * @param searchTerm Termo de pesquisa
   */
  searchfaq(searchTerm: string): Observable<faqResponse> {
    if (!searchTerm.trim()) {
      return this.getfaq();
    }

    const term = searchTerm.toLowerCase();
    
    return this.getfaq().pipe(
      map(response => {
        const filteredSections = response.sections.map(section => {
          const filteredItems = section.items.filter(item => 
            item.question.toLowerCase().includes(term) || 
            item.answer.toLowerCase().includes(term)
          );
          
          return {
            ...section,
            items: filteredItems
          };
        }).filter(section => section.items.length > 0);
        
        return {
          title: response.title,
          sections: filteredSections
        };
      })
    );
  }
}