import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../../models/product.model';
import { FilterGroup, ProductsFilter, SortOption } from '../../../models/filter.model';
import { WindowSizeService } from '../../../services/window-size/window-size.service';
import { ProductsService } from '../../../services/api/products/products.service';

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

  currentPage = 1;
  itemsPerPage = 12;
  totalItems = 0;

  cardWidth = 250;
  cardGap = 8;
  containerWidth = 0;
  itemsPerRow = 4;

  filter: ProductsFilter = {
    search: '',
    categories: [],
    brands: [],
    colors: [],
    sizes: [],
    searchBy: 'all',
    priceRange: { min: 0, max: 2000 },
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
    private windowSizeService: WindowSizeService,
    private productService: ProductsService,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.isMobile = this.windowSizeService.isMobile();
    this.subscriptions.add(
      this.windowSizeService.isMobile$.subscribe((isMobile: boolean) => {
        this.isMobile = isMobile;

        if (!isMobile) {
          this.showFilters = true;
        } else if (this.showFilters) {
          this.showFilters = false;
        }

        // this.adjustItemsPerPage();
        // this.calculateLayout();
      })
    );

    this.subscriptions.add(
      this.windowSizeService.width$.subscribe(() => {
        // this.adjustItemsPerPage();
      })
    );

    this.subscriptions.add(
      this.route.queryParams.subscribe(params => {
        const hasSearch = 'search' in params;
        const hasTag = 'tag' in params;
        const hasCategory = 'category' in params;
        const hasBrand = 'brand' in params;

        if (hasSearch || hasTag || hasCategory || hasBrand) {
          this.resetFilters(false);
        }

        if (hasSearch) {
          this.filter.search = params['search'];
          this.filter.searchBy = 'all';
        } else if (hasTag) {
          this.filter.search = params['tag'];
          this.filter.searchBy = 'tags';
        } else if (hasCategory) {
          this.filter.search = '';
          this.filter.categories = [params['category']];
        } else if (hasBrand) {
          this.filter.search = params['brand'];
          this.filter.searchBy = 'brands';
        }

        if ('page' in params) this.filter.page = +params['page'];
        if ('sort' in params) this.filter.sort = params['sort'];

        this.loadProducts();
      })
    );
  }

  resetFilters(resetPriceRange: boolean = true): void {
    const currentSort = this.filter.sort;
    const currentPage = this.filter.page;
    const currentMaxPrice = this.filter.priceRange.max;

    this.filter = {
      search: '',
      searchBy: 'all',
      categories: [],
      brands: [],
      colors: [],
      sizes: [],
      priceRange: {
        min: 0,
        max: resetPriceRange ? 2000 : currentMaxPrice
      },
      sort: currentSort,
      page: currentPage,
      limit: this.filter.limit
    };

    this.filterGroups.forEach(group => {
      group.options.forEach(option => {
        option.selected = false;
      });
    });
  }

  calculateLayout(): void {
    const container = this.elementRef.nativeElement.querySelector('.products-grid');
    if (!container) return;

    this.containerWidth = container.clientWidth;

    if (this.isMobile) {
      this.itemsPerRow = 2;
      this.cardWidth = Math.floor((this.containerWidth - this.cardGap) / 2);
    } else if (this.containerWidth < 768) {
      this.itemsPerRow = 2;
      this.cardWidth = Math.floor((this.containerWidth - this.cardGap) / 2);
    } else if (this.containerWidth < 992) {
      this.itemsPerRow = 3;
      this.cardWidth = Math.floor((this.containerWidth - (this.cardGap * 2)) / 3);
    } else {
      this.itemsPerRow = 4;
      this.cardWidth = Math.floor((this.containerWidth - (this.cardGap * 3)) / 4);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  adjustItemsPerPage(): void {
    if (this.isMobile) {
      this.filter.limit = 8;
    } else if (this.containerWidth < 992) {
      this.filter.limit = 9;
    } else {
      this.filter.limit = 12;
    }

    if (this.products.length > 0 && !this.loading) {
      this.applyFilters();
    }
  }

  loadProducts(): void {
    this.loading = true;

    this.productService.getProducts(this.filter).subscribe({
      next: (response) => {
        this.products = response.products;
        this.totalItems = response.total;

        if (this.products.length > 0) {
          const maxProductPrice = Math.max(...this.products.map(p => p.price));
          const roundedMaxPrice = Math.ceil(maxProductPrice / 100) * 100;

          if (this.filter.priceRange.max === 2000) {
            this.filter.priceRange.max = roundedMaxPrice;
          }
        }

        this.updateFilterOptions();
        this.applyFilters();
        this.loading = false;

        if (!this.isMobile) {
          this.showFilters = true;
        }
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
        this.loading = false;
      }
    });
  }

  updateFilterOptions(): void {
    const categories = [...new Set(this.products.flatMap(p => p.categories))];
    this.filterGroups.find(g => g.id === 'categories')!.options = categories.map(cat => ({
      id: cat,
      label: cat,
      count: this.products.filter(p => p.categories.includes(cat)).length,
      selected: this.filter.categories.includes(cat)
    }));
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

    const brands = [...new Set(this.products.flatMap(p => p.tags.filter(tag => tag !== 'Tênis')))];
    this.filterGroups.find(g => g.id === 'brands')!.options = brands.map(brand => ({
      id: brand,
      label: brand,
      count: this.products.filter(p => p.tags.includes(brand)).length,
      selected: this.filter.brands.includes(brand)
    }));
  }

  getColorName(colorHex: string): string {
    const colorMap: { [key: string]: string } = {
      '#ff0000': 'Vermelho',
      '#0000ff': 'Azul',
      '#00ff00': 'Verde',
      '#ffff00': 'Amarelo',
      '#ff00ff': 'Rosa',
      '#000000': 'Preto',
      '#ffffff': 'Branco'
    };
    return colorMap[colorHex] || colorHex;
  }

  applyFilters(): void {
    const searchTerm = this.filter.search.toLowerCase();

    this.filteredProducts = this.products.filter(product => {
      if (this.filter.search && !this.matchesSearch(product, searchTerm)) {
        return false;
      }

      if (this.filter.categories.length && !this.matchesFilter(product.categories, this.filter.categories)) {
        return false;
      }

      if (this.filter.colors.length && !this.matchesFilter(product.colors, this.filter.colors)) {
        return false;
      }

      if (this.filter.sizes.length && !this.matchesFilter(product.sizes, this.filter.sizes)) {
        return false;
      }

      if (this.filter.brands.length && !this.matchesFilter(product.tags, this.filter.brands)) {
        return false;
      }

      if (!this.matchesPriceRange(product.price)) {
        return false;
      }

      return true;
    });

    this.sortProducts();
    this.updateUrlParams();
    this.totalItems = this.filteredProducts.length;
    this.ensureValidPage();
  }

  private matchesSearch(product: Product, searchTerm: string): boolean {
    switch (this.filter.searchBy) {
      case 'tags':
        return product.tags.some(tag => tag.toLowerCase().includes(searchTerm));
      case 'categories':
        return product.categories.some(category => category.toLowerCase().includes(searchTerm));
      case 'brands':
        return product.tags.some(tag => tag.toLowerCase() === searchTerm);
      case 'all':
      default:
        return product.title.toLowerCase().includes(searchTerm) ||
               product.description.toLowerCase().includes(searchTerm) ||
               product.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
               product.categories.some(category => category.toLowerCase().includes(searchTerm));
    }
  }

  private matchesFilter(productAttributes: string[], filterAttributes: string[]): boolean {
    return filterAttributes.some(attr => productAttributes.includes(attr));
  }

  private matchesPriceRange(price: number): boolean {
    return price >= this.filter.priceRange.min && price <= this.filter.priceRange.max;
  }

  private ensureValidPage(): void {
    const maxPage = Math.max(1, Math.ceil(this.totalItems / this.filter.limit));
    if (this.filter.page > maxPage) {
      this.filter.page = maxPage;
      this.updateUrlParams();
    }
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
  
    if (this.filter.search) {
      switch (this.filter.searchBy) {
        case 'tags':
          queryParams.tag = this.filter.search;
          break;
        case 'brands':
          queryParams.brand = this.filter.search;
          break;
        case 'categories':
          queryParams.category = this.filter.search;
          break;
        case 'all':
        default:
          queryParams.search = this.filter.search;
      }
    } else if (this.filter.categories.length === 1) {
      queryParams.category = this.filter.categories[0];
    }
    
    if (this.filter.page > 1) queryParams.page = this.filter.page;
    if (this.filter.sort !== 'newest') queryParams.sort = this.filter.sort;
  
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: ''
    });
  }

  onSearch(searchTerm: string): void {
    this.filter.search = searchTerm;
    this.filter.searchBy = 'all';
    this.filter.page = 1;
    this.applyFilters();
  }

  onFilterChange(event: { filterId: string, optionId: string, checked: boolean }): void {
    const { filterId, optionId, checked } = event;

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

    this.filter.page = 1;
    this.applyFilters();
  }

  onSortChange(sortOption: string): void {
    this.filter.sort = sortOption;
    this.applyFilters();
  }

  onPageChange(page: number): void {
    this.filter.page = page;
    this.updateUrlParams();
    window.scrollTo(0, 0);
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  clearFilters(): void {
    this.resetFilters(false);
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

function calculateLayout() {
  throw new Error('Function not implemented.');
}
