export interface NavCategory {
    id: string;
    name: string;
    route?: string;
    subcategories?: NavSubcategory[];
  }
  
  export interface NavSubcategory {
    id: string;
    name: string;
    route: string;
  }