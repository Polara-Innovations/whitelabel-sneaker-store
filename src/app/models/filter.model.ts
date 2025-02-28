export interface FilterOption {
    id: string;
    label: string;
    count?: number;
    selected?: boolean;
  }
  
  export interface FilterGroup {
    id: string;
    name: string;
    options: FilterOption[];
    expanded?: boolean;
  }
  
  export interface SortOption {
    id: string;
    label: string;
  }
  
  export interface ProductsFilter {
    search: string;
    categories: string[];
    brands: string[];
    colors: string[];
    sizes: string[];
    priceRange: {
      min: number;
      max: number;
    };
    sort: string;
    page: number;
    limit: number;
  }