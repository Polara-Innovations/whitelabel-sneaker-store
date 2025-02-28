export interface Product {
  id: number;
  title: string;
  description: string;
  oldPrice?: number;
  price: number;
  imagesByColor: { [colorCode: string]: string[] };
  tags: string[];
  inStock: boolean;
  stockQuantity: number;
  colors: string[];
  sizes: string[];
}