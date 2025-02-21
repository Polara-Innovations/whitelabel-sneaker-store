export interface Product {
  id: number;
  title: string;
  description: string;
  oldPrice?: number;
  price: number;
  images: string[];
  tags: string[];
  inStock: boolean; // Informações sobre estoque
  stockQuantity: number; // Quantidade em estoque
  colors?: string[]; // Opcional: adicionando cores
  sizes?: string[]; // Opcional: adicionando tamanhos
}