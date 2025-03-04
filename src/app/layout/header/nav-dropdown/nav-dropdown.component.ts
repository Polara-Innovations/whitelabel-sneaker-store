import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavCategory } from '../../../models/nav-category.model';
import { ThemeService } from '../../../services/theme/theme.service';

@Component({
  selector: 'app-nav-dropdown',
  templateUrl: './nav-dropdown.component.html',
  styleUrls: ['./nav-dropdown.component.scss']
})
export class NavDropdownComponent implements OnInit {
  @Input() title: string = 'Categorias';
  @Input() items: NavCategory[] = [];
  @Input() searchParam: string = 'category'; // Define o parâmetro de busca (category, tag, etc)
  
  isOpen: boolean = false;
  activeItem: NavCategory | null = null;
  
  constructor(
    private router: Router,
    private elementRef: ElementRef,
    public themeService: ThemeService
  ) {}
  
  ngOnInit(): void {}
  
  toggleMenu(): void {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      this.activeItem = null;
    }
  }
  
  openMenu(): void {
    this.isOpen = true;
  }
  
  closeMenu(): void {
    this.isOpen = false;
    this.activeItem = null;
  }
  
  setActiveItem(item: NavCategory): void {
    this.activeItem = item;
  }
  
  navigate(item: any): void {
    // Determina o parâmetro da URL com base no tipo de pesquisa
    const params: any = {};
    params[this.searchParam] = item.name;
    
    // Navegar para a página de produtos com o parâmetro
    this.router.navigate(['/products'], { queryParams: params });
    this.closeMenu();
  }
  
  // Fechar o menu ao clicar fora dele
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }
}