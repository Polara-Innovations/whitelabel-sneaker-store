import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { TeamMember } from '../../../../models/about-us.model';

@Component({
  selector: 'app-team-section',
  templateUrl: './team-section.component.html',
  styleUrls: ['./team-section.component.css'],
  standalone: false
})
export class TeamSectionComponent {
  @Input() members: TeamMember[] = [];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.centerLastRowItem();
    
    // Recalcular quando a janela for redimensionada
    window.addEventListener('resize', () => {
      this.centerLastRowItem();
    });
  }
  
  centerLastRowItem() {
    setTimeout(() => {
      const grid = this.el.nativeElement.querySelector('.team-grid');
      const cards = grid.querySelectorAll('.team-member-card');
      
      if (cards.length === 0) return;
      
      // Remover a classe de todos os cards primeiro
      cards.forEach((card: HTMLElement) => {
        this.renderer.removeClass(card, 'last-row-centered');
      });
      
      // Calcular quantos cards cabem por linha
      const gridStyle = window.getComputedStyle(grid);
      const gap = parseInt(gridStyle.columnGap || '0', 10);
      const cardWidth = cards[0].offsetWidth;
      const gridWidth = grid.offsetWidth;
      const cardsPerRow = Math.floor((gridWidth + gap) / (cardWidth + gap));
      
      // Verificar se o último card está sozinho na última linha
      const remainder = cards.length % cardsPerRow;
      
      if (remainder === 1) {
        // O último card está sozinho na última linha
        const lastCard = cards[cards.length - 1] as HTMLElement;
        this.renderer.addClass(lastCard, 'last-row-centered');
      }
    }, 0);
  }

}