import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { faqItem } from '../../../models/faq.model';

@Component({
  selector: 'app-faq-item',
  templateUrl: './faq-item.component.html',
  styleUrls: ['./faq-item.component.scss'],
  standalone: false,
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        padding: '0 1.5rem',
        opacity: 0
      })),
      state('expanded', style({
        height: '*',
        padding: '1rem 1.5rem',
        opacity: 1
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class faqItemComponent {
  @Input() item!: faqItem;
  @Output() toggleExpand = new EventEmitter<string>();

  toggle(): void {
    this.toggleExpand.emit(this.item.id);
  }
}