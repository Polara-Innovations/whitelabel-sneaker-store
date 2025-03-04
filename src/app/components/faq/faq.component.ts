import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { faqResponse, faqSection } from '../../models/faq.model';
import { FaqService } from '../../services/api/faq/faq.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit, OnDestroy {
  title: string = 'Perguntas Frequentes';
  sections: faqSection[] = [];
  loading: boolean = true;
  error: string | null = null;
  searchTerm: string = '';
  isSearching: boolean = false;
  
  private subscriptions: Subscription = new Subscription();

  constructor(private faqService: FaqService) {}

  ngOnInit(): void {
    this.loadfaq();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadfaq(): void {
    this.loading = true;
    this.error = null;
    this.isSearching = false;

    const subscription = this.faqService.getfaq().subscribe({
      next: (data: faqResponse) => {
        this.title = data.title;
        this.sections = data.sections;
        
        // Inicializar todos os itens como não expandidos
        this.sections.forEach(section => {
          section.items.forEach(item => {
            item.isExpanded = false;
          });
        });
        
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Não foi possível carregar as perguntas frequentes. Por favor, tente novamente mais tarde.';
        this.loading = false;
        console.error('Erro ao carregar faq:', err);
      }
    });

    this.subscriptions.add(subscription);
  }

  toggleItem(sectionIndex: number, itemId: string): void {
    const items = this.sections[sectionIndex].items;
    const item = items.find(i => i.id === itemId);
    
    if (item) {
      // Fechar todos os outros itens na mesma seção
      items.forEach(i => {
        if (i.id !== itemId) {
          i.isExpanded = false;
        }
      });
      
      // Alternar o estado do item clicado
      item.isExpanded = !item.isExpanded;
    }
  }

  expandAll(): void {
    this.sections.forEach(section => {
      section.items.forEach(item => {
        item.isExpanded = true;
      });
    });
  }

  collapseAll(): void {
    this.sections.forEach(section => {
      section.items.forEach(item => {
        item.isExpanded = false;
      });
    });
  }

  search(): void {
    if (!this.searchTerm.trim()) {
      this.loadfaq();
      return;
    }

    this.loading = true;
    this.error = null;
    this.isSearching = true;

    const subscription = this.faqService.searchfaq(this.searchTerm).subscribe({
      next: (data: faqResponse) => {
        this.title = `Resultados para "${this.searchTerm}"`;
        this.sections = data.sections;
        
        // Expandir todos os resultados da pesquisa
        this.sections.forEach(section => {
          section.items.forEach(item => {
            item.isExpanded = true;
          });
        });
        
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao pesquisar. Por favor, tente novamente.';
        this.loading = false;
        console.error('Erro na pesquisa:', err);
      }
    });

    this.subscriptions.add(subscription);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.loadfaq();
  }
}