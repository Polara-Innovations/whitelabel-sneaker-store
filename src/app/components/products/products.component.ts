import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product.model';
import { FilterGroup, ProductsFilter, SortOption } from '../../models/filter.model';
import { WindowSizeService } from '../../services/window-size/window-size.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = true;
  showFilters = false;
  isMobile = false;
  
  private subscriptions: Subscription = new Subscription();
  
  // Paginação
  currentPage = 1;
  itemsPerPage = 12;
  totalItems = 0;
  
  // Filtros
  filter: ProductsFilter = {
    search: '',
    categories: [],
    brands: [],
    colors: [],
    sizes: [],
    priceRange: { min: 0, max: 2000 }, // Valor mais alto como padrão
    sort: 'newest',
    page: 1,
    limit: 12
  };
  
  filterGroups: FilterGroup[] = [
    {
      id: 'categories',
      name: 'Categorias',
      options: [],
      expanded: true
    },
    {
      id: 'brands',
      name: 'Marcas',
      options: [],
      expanded: true
    },
    {
      id: 'colors',
      name: 'Cores',
      options: [],
      expanded: true
    },
    {
      id: 'sizes',
      name: 'Tamanhos',
      options: [],
      expanded: true
    }
  ];
  
  sortOptions: SortOption[] = [
    { id: 'newest', label: 'Mais Recentes' },
    { id: 'priceAsc', label: 'Preço: Menor para Maior' },
    { id: 'priceDesc', label: 'Preço: Maior para Menor' },
    { id: 'nameAsc', label: 'Nome: A-Z' },
    { id: 'nameDesc', label: 'Nome: Z-A' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private windowSizeService: WindowSizeService
  ) {}

  ngOnInit(): void {
    // Verificar se é mobile
    this.isMobile = this.windowSizeService.isMobile();
    
    // Inscrever-se para mudanças no tamanho da tela
    this.subscriptions.add(
      this.windowSizeService.isMobile$.subscribe(isMobile => {
        this.isMobile = isMobile;
        
        // Se não for mobile, mostrar filtros por padrão
        if (!isMobile) {
          this.showFilters = true;
        }
      })
    );
    
    // Obter parâmetros da URL para filtros iniciais
    this.route.queryParams.subscribe(params => {
      if (params['search']) this.filter.search = params['search'];
      if (params['category']) this.filter.categories = [params['category']];
      if (params['page']) this.filter.page = +params['page'];
      if (params['sort']) this.filter.sort = params['sort'];
      
      this.loadProducts();
    });
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadProducts(): void {
    this.loading = true;
    
    const mockProducts: Product[] = [
      {
        id: 1,
        title: 'Nike Air Force 1',
        description: 'O clássico tênis de basquete que revolucionou o jogo agora é um ícone da moda.',
        oldPrice: 899.90,
        price: 799.90,
        imagesByColor: {
          '#ff0000': ['https://picsum.photos/800/600?random=11']
        },
        tags: ['Tênis', 'Nike', 'Casual'],
        inStock: true,
        stockQuantity: 5,
        colors: ['#ff0000'],
        sizes: ['39', '40', '41'],
        categories: ['Basquete', 'Moda'],
        createdAt: new Date('2023-01-01')
      },
      {
        id: 2,
        title: 'Nike Air Jordan 1',
        description: 'O lendário tênis que definiu uma era continua a inspirar novas gerações.',
        oldPrice: 1599.90,
        price: 1299.90,
        imagesByColor: {
          '#0000ff': ['https://picsum.photos/800/600?random=13']
        },
        tags: ['Tênis', 'Nike', 'Basketball'],
        inStock: true,
        stockQuantity: 8,
        colors: ['#0000ff'],
        sizes: ['40', '42', '43'],
        categories: ['Basquete', 'Esporte'],
        createdAt: new Date('2023-02-01')
      }
    ];
    
    // Para fins de demonstração, vamos simular um delay
    setTimeout(() => {
      this.products = mockProducts;
      this.totalItems = this.products.length;
      
      // Calcular o preço máximo dos produtos
      if (this.products.length > 0) {
        const maxProductPrice = Math.max(...this.products.map(p => p.price));
        const roundedMaxPrice = Math.ceil(maxProductPrice / 100) * 100;
        
        // Atualizar o filtro de preço se o valor atual for o padrão
        if (this.filter.priceRange.max === 2000) {
          this.filter.priceRange.max = roundedMaxPrice;
        }
      }
      
      this.updateFilterOptions();
      this.applyFilters();
      this.loading = false;
      
      // Em desktop, mostrar filtros por padrão
      if (!this.isMobile) {
        this.showFilters = true;
      }
    }, 800);
  }

  updateFilterOptions(): void {
    // Atualiza as opções de filtro com base nos produtos disponíveis
    // Exemplo para categorias:
    const categories = [...new Set(this.products.flatMap(p => p.categories))];
    this.filterGroups.find(g => g.id === 'categories')!.options = categories.map(cat => ({
      id: cat,
      label: cat,
      count: this.products.filter(p => p.categories.includes(cat)).length,
      selected: this.filter.categories.includes(cat)
    }));
    
    // Faça o mesmo para marcas, cores e tamanhos
    const colors = [...new Set(this.products.flatMap(p => p.colors))];
    this.filterGroups.find(g => g.id === 'colors')!.options = colors.map(color => ({
      id: color,
      label: this.getColorName(color),
      count: this.products.filter(p => p.colors.includes(color)).length,
      selected: this.filter.colors.includes(color)
    }));
    
    const sizes = [...new Set(this.products.flatMap(p => p.sizes))];
    this.filterGroups.find(g => g.id === 'sizes')!.options = sizes.map(size => ({
      id: size,
      label: size,
      count: this.products.filter(p => p.sizes.includes(size)).length,
      selected: this.filter.sizes.includes(size)
    }));
  }

  getColorName(colorHex: string): string {
    // Função simples para mapear códigos de cores para nomes
    const colorMap: {[key: string]: string} = {
      '#ff0000': 'Vermelho',
      '#0000ff': 'Azul',
      '#00ff00': 'Verde',
      '#ffff00': 'Amarelo',
      '#000000': 'Preto',
      '#ffffff': 'Branco'
    };
    
    return colorMap[colorHex] || colorHex;
  }

  applyFilters(): void {
    // Filtra os produtos com base nos critérios selecionados
    this.filteredProducts = this.products.filter(product => {
      // Filtro de pesquisa
      if (this.filter.search && !product.title.toLowerCase().includes(this.filter.search.toLowerCase())) {
        return false;
      }
      
      // Filtro de categorias
      if (this.filter.categories.length && !this.filter.categories.some(category => product.categories.includes(category))) {
        return false;
      }
      
      // Filtro de cores
      if (this.filter.colors.length && !this.filter.colors.some(color => product.colors.includes(color))) {
        return false;
      }
      
      // Filtro de tamanhos
      if (this.filter.sizes.length && !this.filter.sizes.some(size => product.sizes.includes(size))) {
        return false;
      }
      
      // Filtro de preço
      if (product.price < this.filter.priceRange.min || product.price > this.filter.priceRange.max) {
        return false;
      }
      
      return true;
    });
    
    // Aplicar ordenação
    this.sortProducts();
    
    // Atualizar URL com os filtros atuais
    this.updateUrlParams();
    
    // Calcular total de itens para paginação
    this.totalItems = this.filteredProducts.length;
  }

  sortProducts(): void {
    switch (this.filter.sort) {
      case 'priceAsc':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'nameAsc':
        this.filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'nameDesc':
        this.filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'newest':
      default:
        this.filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }
  }

  updateUrlParams(): void {
    const queryParams: any = {};
    
    if (this.filter.search) queryParams.search = this.filter.search;
    if (this.filter.categories.length === 1) queryParams.category = this.filter.categories[0];
    if (this.filter.page > 1) queryParams.page = this.filter.page;
    if (this.filter.sort !== 'newest') queryParams.sort = this.filter.sort;
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }

  onSearch(searchTerm: string): void {
    this.filter.search = searchTerm;
    this.filter.page = 1; // Reset para a primeira página ao pesquisar
    this.applyFilters();
  }

  onFilterChange(event: {filterId: string, optionId: string, checked: boolean}): void {
    const { filterId, optionId, checked } = event;
    
    // Obter o array correto com base no ID do filtro
    const filterArray = this.filter[filterId as keyof ProductsFilter] as string[];
    
    if (checked) {
      if (!filterArray.includes(optionId)) {
        (this.filter[filterId as keyof ProductsFilter] as string[]).push(optionId);
      }
    } else {
      const index = filterArray.indexOf(optionId);
      if (index !== -1) {
        filterArray.splice(index, 1);
      }
    }
    
    this.filter.page = 1; // Reset para a primeira página ao mudar filtros
    this.applyFilters();
  }

  onSortChange(sortOption: string): void {
    this.filter.sort = sortOption;
    this.applyFilters();
  }

  onPageChange(page: number): void {
    this.filter.page = page;
    this.updateUrlParams();
    // Para paginação no cliente, apenas atualize a visualização
    window.scrollTo(0, 0);
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  clearFilters(): void {
    this.filter = {
      ...this.filter,
      categories: [],
      brands: [],
      colors: [],
      sizes: [],
      priceRange: { min: 0, max: this.filter.priceRange.max } // Manter o preço máximo atual
    };
    
    // Reset todas as opções de filtro selecionadas
    this.filterGroups.forEach(group => {
      group.options.forEach(option => {
        option.selected = false;
      });
    });
    
    this.applyFilters();
  }

  get paginatedProducts(): Product[] {
    const startIndex = (this.filter.page - 1) * this.filter.limit;
    return this.filteredProducts.slice(startIndex, startIndex + this.filter.limit);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.filter.limit);
  }
}