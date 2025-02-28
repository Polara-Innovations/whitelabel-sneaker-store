import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: number;
  productId: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_STORAGE_KEY = 'shopping_cart';
  private items: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  private cartCountSubject = new BehaviorSubject<number>(0);
  private cartTotalSubject = new BehaviorSubject<number>(0);

  // Observables que os componentes podem assinar
  public cart$: Observable<CartItem[]> = this.cartSubject.asObservable();
  public cartCount$: Observable<number> = this.cartCountSubject.asObservable();
  public cartTotal$: Observable<number> = this.cartTotalSubject.asObservable();

  constructor() {
    this.loadCart();
  }

  // Carregar o carrinho do sessionStorage
  private loadCart(): void {
    const storedCart = sessionStorage.getItem(this.CART_STORAGE_KEY);
    if (storedCart) {
      this.items = JSON.parse(storedCart);
      this.updateCart();
    }
  }

  // Salvar o carrinho no sessionStorage
  private saveCart(): void {
    sessionStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(this.items));
    this.updateCart();
  }

  // Atualizar observables do carrinho
  private updateCart(): void {
    this.cartSubject.next([...this.items]);
    this.cartCountSubject.next(this.getTotalItems());
    this.cartTotalSubject.next(this.calculateTotal());
  }

  // Obter todos os itens do carrinho
  getItems(): CartItem[] {
    return [...this.items];
  }

  // Adicionar um item ao carrinho
  addItem(item: Omit<CartItem, 'id'>): void {
    // Verificar se o item já existe no carrinho (mesmo produto, cor e tamanho)
    const existingItemIndex = this.items.findIndex(i => 
      i.productId === item.productId && 
      i.color === item.color && 
      i.size === item.size
    );

    if (existingItemIndex >= 0) {
      // Se o item já existe, apenas aumenta a quantidade
      this.items[existingItemIndex].quantity += item.quantity;
    } else {
      // Se não existe, adiciona como um novo item
      const newItem: CartItem = {
        ...item,
        id: this.generateId()
      };
      this.items.push(newItem);
    }

    this.saveCart();
  }

  // Remover um item do carrinho por ID
  removeItem(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
    this.saveCart();
  }

  // Atualizar a quantidade de um item
  updateQuantity(id: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(id);
      return;
    }

    const itemIndex = this.items.findIndex(item => item.id === id);
    if (itemIndex >= 0) {
      this.items[itemIndex].quantity = quantity;
      this.saveCart();
    }
  }

  // Limpar o carrinho
  clearCart(): void {
    this.items = [];
    this.saveCart();
  }

  // Contar o número total de itens no carrinho
  getTotalItems(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  // Calcular o valor total do carrinho
  calculateTotal(): number {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Gerar um ID único para um item do carrinho
  private generateId(): number {
    return Date.now() + Math.floor(Math.random() * 1000);
  }
}