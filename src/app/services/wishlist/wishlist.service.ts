import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface WishlistItem {
  id: number;
  productId: number;
  name: string;
  imageUrl: string;
  price: number;
  available: boolean;
  color: string;
  size: string;
  stockQuantity: number;
  dateAdded?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly WISHLIST_STORAGE_KEY = 'user_wishlist_items';
  private _wishlistItems: WishlistItem[] = [];
  private wishlistSubject = new BehaviorSubject<WishlistItem[]>([]);

  // Observable público para componentes se inscreverem
  public wishlist$: Observable<WishlistItem[]> = this.wishlistSubject.asObservable();

  constructor() {
    this.loadWishlist();
  }

  // Carregar lista de desejos do localStorage
  private loadWishlist(): void {
    const storedWishlist = localStorage.getItem(this.WISHLIST_STORAGE_KEY);
    if (storedWishlist) {
      try {
        this._wishlistItems = JSON.parse(storedWishlist);
        // Converter strings de data para objetos Date
        this._wishlistItems.forEach(item => {
          if (item.dateAdded) {
            item.dateAdded = new Date(item.dateAdded);
          }
        });
        this.wishlistSubject.next([...this._wishlistItems]);
      } catch (error) {
        console.error('Erro ao carregar lista de desejos:', error);
        this._wishlistItems = [];
        this.wishlistSubject.next([]);
      }
    }
  }

  // Salvar lista de desejos no localStorage
  private saveWishlist(): void {
    localStorage.setItem(this.WISHLIST_STORAGE_KEY, JSON.stringify(this._wishlistItems));
    this.wishlistSubject.next([...this._wishlistItems]);
  }

  // Adicionar item à lista de desejos
  addItem(item: Omit<WishlistItem, 'id' | 'dateAdded'>): void {
    // Verificar se o item já existe na lista
    const existingItemIndex = this._wishlistItems.findIndex(
      i => i.productId === item.productId && 
           i.color === item.color && 
           i.size === item.size
    );

    if (existingItemIndex === -1) {
      // Adicionar novo item com ID único e data de adição
      const newItem: WishlistItem = {
        ...item,
        id: this.generateId(),
        dateAdded: new Date()
      };
      
      this._wishlistItems.push(newItem);
      this.saveWishlist();
    }
  }

  // Remover item da lista de desejos
  removeItem(item: WishlistItem): void {
    this._wishlistItems = this._wishlistItems.filter(i => i.id !== item.id);
    this.saveWishlist();
  }

  // Verificar se um produto está na lista de desejos
  isInWishlist(productId: number, color?: string, size?: string): boolean {
    return this._wishlistItems.some(
      item => item.productId === productId && 
             (!color || item.color === color) && 
             (!size || item.size === size)
    );
  }

  // Limpar toda a lista de desejos
  clearWishlist(): void {
    this._wishlistItems = [];
    this.saveWishlist();
  }

  // Atualizar disponibilidade de um item
  updateItemAvailability(id: number, available: boolean): void {
    const itemIndex = this._wishlistItems.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
      this._wishlistItems[itemIndex].available = available;
      this.saveWishlist();
    }
  }

  // Atualizar preço de um item
  updateItemPrice(id: number, price: number): void {
    const itemIndex = this._wishlistItems.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
      this._wishlistItems[itemIndex].price = price;
      this.saveWishlist();
    }
  }

  // Gerar ID único para novos itens
  private generateId(): number {
    const ids = this._wishlistItems.map(item => item.id);
    const maxId = ids.length > 0 ? Math.max(...ids) : 0;
    return maxId + 1;
  }

  // Obter o número total de itens na lista de desejos
  get totalItems(): number {
    return this._wishlistItems.length;
  }
}