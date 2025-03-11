import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Tab } from '../../../../models/tab.model';
import { NavCategory } from '../../../../models/nav-category.model';

@Component({
  selector: 'app-nav-item-dropdown',
  templateUrl: './nav-item-dropdown.component.html',
  styleUrls: ['./nav-item-dropdown.component.scss'],
  standalone: false
})
export class NavItemDropdownComponent {
  @Input() tab: Tab = { name: '', route: '', icon: '', display: '' };
  @Input() isActive: boolean = false;
  @Input() items: NavCategory[] = [];
  @Input() layoutMode: 'row' | 'column' = 'row'; @Output() navClick = new EventEmitter<void>();
  @Output() dropdownToggled = new EventEmitter<boolean>();

  isOpen: boolean = false;
  activeItem: NavCategory | null = null;

  constructor(
    private router: Router,
    private elementRef: ElementRef
  ) { }

  toggleDropdown(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.isOpen = !this.isOpen;

    // Emitir evento para o componente pai
    this.dropdownToggled.emit(this.isOpen);

    if (!this.isOpen) {
      this.activeItem = null;
    }
  }

  closeMenu(): void {
    this.isOpen = false;
    this.activeItem = null;
    this.dropdownToggled.emit(false);
  }

  setActiveItem(item: NavCategory): void {
    // Se clicar no item já ativo, navegar diretamente
    if (this.activeItem === item) {
      this.navigate(item);
      return;
    }

    this.activeItem = item;
  }

  // Modificar o método toggleAccordionItem
  toggleAccordionItem(item: NavCategory, event: Event): void {
    // Impedir que o clique propague e feche o dropdown
    event.stopPropagation();

    // Alternar o item ativo
    if (this.activeItem === item) {
      this.activeItem = null;
    } else {
      this.activeItem = item;
    }
  }

  navigate(item: any): void {
    // Determinar o parâmetro de pesquisa com base no nome do tab
    const searchParam = this.tab.name.toLowerCase() === 'categorias' ? 'category' : 'tag';

    // Criar parâmetros para a navegação
    const params: any = {};
    params[searchParam] = item.name;

    // Navegar para a página de produtos
    this.router.navigate(['/products'], { queryParams: params });
    this.closeMenu();
    this.navClick.emit();
  }
}