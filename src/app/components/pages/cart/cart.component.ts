import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../../services/cart/cart.service';
import { Product } from '../../../models/product.model';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../services/api/products/products.service';
import { EventEmitter, Output } from '@angular/core';
import { ModalService } from '../../../services/modal/modal.service';
import { WishlistService } from '../../../services/wishlist/wishlist.service';

interface ShippingOption {
  id: string;
  name: string;
  price: number;
  deliveryTime: string;
}

interface Coupon {
  code: string;
  discount: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: false
})
export class CartComponent implements OnInit, OnDestroy {
  @Output() productAction = new EventEmitter();
  cartItems: CartItem[] = [];
  savedItems: CartItem[] = [];
  recommendedProducts: Product[] = [];
  subtotal: number = 0;
  discount: number = 0;
  shippingCost: number = 0;
  zipCode: string = '';
  couponCode: string = '';
  appliedCoupon: Coupon | null = null;
  shippingOptions: ShippingOption[] = [];
  selectedShipping: string | null = null;

  private cartSubscription?: Subscription;
  private totalSubscription?: Subscription;
  private readonly SAVED_ITEMS_KEY = 'saved_items';

  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private router: Router,
    private modalService: ModalService,
    private wishlistService: WishlistService
  ) { }

  ngOnInit(): void {
    // Inscrever-se para receber atualizações do carrinho
    this.cartSubscription = this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.loadRecommendedProducts();
    });

    // Inscrever-se para receber atualizações do total
    this.totalSubscription = this.cartService.cartTotal$.subscribe(total => {
      this.subtotal = total;
    });

    // Carregar itens salvos para depois
    this.loadSavedItems();

    // Simular produtos recomendados
    this.loadRecommendedProducts();
  }

  ngOnDestroy(): void {
    // Limpar inscrições ao destruir o componente
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if (this.totalSubscription) {
      this.totalSubscription.unsubscribe();
    }
  }

  onProductCardAction(product: Product): void {
    // Adicionar o produto ao carrinho
    this.quickAddToCart(product);

    // Remover o produto dos recomendados
    this.recommendedProducts = this.recommendedProducts.filter(p => p.id !== product.id);
  }

  removeItem(id: number, event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    const item = this.cartItems.find(item => item.id === id);
    const itemName = item ? item.name : 'Item';

    this.cartService.removeItem(id);

    // Adicionar notificação
    this.modalService.openNotificationModal(
      'info',
      'Item removido',
      `${itemName} foi removido do seu carrinho.`,
      3000
    );
  }

  updateQuantity(id: number, change: number): void {
    const item = this.cartItems.find(item => item.id === id);
    if (item) {
      const newQuantity = item.quantity + change;
      this.cartService.updateQuantity(id, newQuantity);
    }
  }

  saveForLater(item: CartItem): void {
    // Remover do carrinho
    this.cartService.removeItem(item.id);

    // Adicionar aos itens salvos para depois
    this.savedItems.push({ ...item });

    // Salvar no localStorage
    this.updateSavedItems();

    // Adicionar notificação
    this.modalService.openNotificationModal(
      'info',
      'Item salvo para depois',
      `${item.name} foi movido para os itens salvos.`,
      3000
    );
  }

  addToWishlist(item: CartItem): void {
    // Adicionar à lista de desejos
    this.wishlistService.addItem({
      productId: item.productId,
      name: item.name,
      imageUrl: item.imageUrl,
      price: item.price,
      available: item.stockQuantity > 0,
      color: item.color,
      size: item.size,
      stockQuantity: item.stockQuantity
    });
  
    // Notificar o usuário
    this.modalService.openNotificationModal(
      'success',
      'Adicionado à lista de desejos',
      `${item.name} foi movido para sua lista de desejos.`,
      3000
    );
  
    // Remover do carrinho
    this.cartService.removeItem(item.id);
  }

  moveToCart(item: CartItem): void {
    // Adicionar ao carrinho
    this.cartService.addItem({
      productId: item.productId,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      quantity: 1,
      color: item.color,
      size: item.size,
      stockQuantity: item.stockQuantity
    });

    // Remover dos itens salvos
    const index = this.savedItems.findIndex(i =>
      i.productId === item.productId &&
      i.color === item.color &&
      i.size === item.size
    );

    if (index !== -1) {
      this.savedItems.splice(index, 1);
      this.updateSavedItems();
    }

    // Adicionar notificação
    this.modalService.openNotificationModal(
      'success',
      'Item movido para o carrinho',
      `${item.name} foi adicionado ao seu carrinho.`,
      3000
    );
  }

  removeSavedItem(index: number): void {
    const itemName = this.savedItems[index].name;
    this.savedItems.splice(index, 1);
    this.updateSavedItems();

    // Adicionar notificação
    this.modalService.openNotificationModal(
      'info',
      'Item removido',
      `${itemName} foi removido dos itens salvos.`,
      3000
    );
  }

  onZipCodeChange(): void {
    // Limpar opções de frete quando o CEP é alterado
    this.shippingOptions = [];
    this.selectedShipping = null;
    this.shippingCost = 0;
  }

  calculateShipping(): void {
    // Validar CEP (formato básico para Brasil)
    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
    if (!cepRegex.test(this.zipCode)) {
      this.modalService.openNotificationModal(
        'error',
        'CEP inválido',
        'Por favor, digite um CEP válido no formato 00000-000',
        3000
      );
      return;
    }

    // Simular cálculo de frete
    this.shippingOptions = [
      {
        id: 'standard',
        name: 'Entrega Padrão',
        price: 15.90,
        deliveryTime: '5 a 8 dias úteis'
      },
      {
        id: 'express',
        name: 'Entrega Expressa',
        price: 25.90,
        deliveryTime: '2 a 3 dias úteis'
      },
      {
        id: 'same_day',
        name: 'Entrega no Mesmo Dia',
        price: 35.90,
        deliveryTime: 'Hoje, se pedido até às 12h'
      }
    ];

    // Verificar se o valor da compra é acima de um limite para frete grátis
    if (this.subtotal > 150) {
      this.shippingOptions.unshift({
        id: 'free',
        name: 'Frete Grátis',
        price: 0,
        deliveryTime: '7 a 10 dias úteis'
      });
    }

    this.modalService.openNotificationModal(
      'success',
      'Frete calculado',
      'Opções de frete calculadas com sucesso!',
      2000
    );
  }

  selectShipping(option: ShippingOption): void {
    this.selectedShipping = option.id;
    this.shippingCost = option.price;
  }

  applyCoupon(): void {
    if (!this.couponCode.trim()) {
      this.modalService.openNotificationModal(
        'error',
        'Cupom inválido',
        'Por favor, digite um cupom válido',
        3000
      );
      return;
    }

    // Simular validação de cupom
    const validCoupons: { [key: string]: number } = {
      'DESCONTO10': 10,
      'DESCONTO20': 20,
      'FRETEGRATIS': 0
    };

    const couponUpperCase = this.couponCode.toUpperCase();

    if (validCoupons.hasOwnProperty(couponUpperCase)) {
      // Aplicar desconto
      const discountValue = validCoupons[couponUpperCase];

      if (couponUpperCase === 'FRETEGRATIS') {
        // Cupom de frete grátis
        this.shippingCost = 0;
        this.modalService.openNotificationModal(
          'success',
          'Cupom aplicado',
          'Cupom de frete grátis aplicado com sucesso!',
          3000
        );
        this.appliedCoupon = {
          code: couponUpperCase,
          discount: this.shippingCost
        };
      } else {
        // Cupom de desconto percentual
        this.discount = (this.subtotal * discountValue) / 100;
        this.modalService.openNotificationModal(
          'success',
          'Cupom aplicado',
          `Cupom de ${discountValue}% de desconto aplicado com sucesso!`,
          3000
        );
        this.appliedCoupon = {
          code: couponUpperCase,
          discount: this.discount
        };
      }

      // Limpar campo de cupom
      this.couponCode = '';
    } else {
      this.modalService.openNotificationModal(
        'error',
        'Cupom inválido',
        'O cupom informado é inválido ou está expirado',
        3000
      );
    }
  }

  removeCoupon(): void {
    if (this.appliedCoupon) {
      if (this.appliedCoupon.code === 'FRETEGRATIS') {
        // Restaurar o frete
        if (this.selectedShipping) {
          const option = this.shippingOptions.find(opt => opt.id === this.selectedShipping);
          if (option) {
            this.shippingCost = option.price;
          }
        }
      } else {
        // Remover desconto
        this.discount = 0;
      }

      this.appliedCoupon = null;

      this.modalService.openNotificationModal(
        'info',
        'Cupom removido',
        'O cupom de desconto foi removido.',
        3000
      );
    }
  }

  getTotal(): number {
    return this.subtotal - this.discount + this.shippingCost;
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  checkout(): void {
    if (this.cartItems.length === 0) {
      this.modalService.openNotificationModal(
        'error',
        'Carrinho vazio',
        'Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.',
        3000
      );
      return;
    }

    if (this.selectedShipping === null && this.shippingOptions.length > 0) {
      this.modalService.openNotificationModal(
        'error',
        'Selecione o frete',
        'Por favor, selecione uma opção de entrega antes de continuar.',
        3000
      );
      return;
    }

    // Navegar para a página de checkout
    this.router.navigate(['/checkout']);
  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  getEstimatedDelivery(): string {
    // Calcular data estimada de entrega (7 dias úteis a partir de hoje)
    const today = new Date();
    const deliveryDate = new Date(today);

    // Adicionar 7 dias úteis (pulando finais de semana)
    let addedDays = 0;
    while (addedDays < 7) {
      deliveryDate.setDate(deliveryDate.getDate() + 1);
      // 0 = domingo, 6 = sábado
      if (deliveryDate.getDay() !== 0 && deliveryDate.getDay() !== 6) {
        addedDays++;
      }
    }

    // Formatar data para exibição
    return deliveryDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  }

  // Métodos para lidar com produtos recomendados

  // Método para carregar produtos recomendados de forma dinâmica
  loadRecommendedProducts(): void {
    if (this.cartItems.length === 0) {
      // Se o carrinho estiver vazio, carrega produtos populares
      this.productService.getProducts().subscribe({
        next: (response) => {
          // Pega até 8 produtos aleatórios que estejam em estoque
          this.recommendedProducts = response.products
            .filter(p => p.inStock)
            .sort(() => 0.5 - Math.random())
            .slice(0, 8);
        },
        error: (error) => {
          this.modalService.openNotificationModal(
            'error',
            'Erro ao carregar produtos',
            'Não foi possível carregar os produtos recomendados.',
            3000
          );
        }
      });
    } else {
      // Se houver itens no carrinho, busca produtos relacionados
      const productIds = this.cartItems.map(item => item.productId);

      this.productService.getProducts().subscribe({
        next: (response) => {
          // Filtra produtos relacionados com base nas categorias e tags dos produtos no carrinho
          this.recommendedProducts = this.findRelatedProducts(response.products, productIds);
        },
        error: (error) => {
          console.error('Erro ao carregar produtos recomendados:', error);
          this.modalService.openNotificationModal(
            'error',
            'Erro ao carregar produtos',
            'Não foi possível carregar os produtos relacionados.',
            3000
          );
        }
      });
    }
  }

  // Encontra produtos relacionados aos itens do carrinho
  findRelatedProducts(products: Product[], cartProductIds: number[]): Product[] {
    // Primeiro, obtém as categorias e tags dos produtos no carrinho
    const cartProducts = products.filter(p => cartProductIds.includes(p.id));

    if (cartProducts.length === 0) {
      return this.getRandomProducts(products, 8);
    }

    const cartCategories = new Set<string>();
    const cartTags = new Set<string>();

    cartProducts.forEach(p => {
      p.categories.forEach(c => cartCategories.add(c));
      p.tags.forEach(t => cartTags.add(t));
    });

    // Filtra produtos que compartilham categorias ou tags, mas não estão no carrinho
    const relatedProducts = products.filter(p =>
      !cartProductIds.includes(p.id) &&
      p.inStock &&
      (
        p.categories.some(category => cartCategories.has(category)) ||
        p.tags.some(tag => cartTags.has(tag))
      )
    );

    // Se não encontrar produtos suficientes, completa com produtos aleatórios
    if (relatedProducts.length < 8) {
      const randomProducts = this.getRandomProducts(
        products.filter(p => !cartProductIds.includes(p.id) && p.inStock && !relatedProducts.includes(p)),
        8 - relatedProducts.length
      );

      return [...relatedProducts, ...randomProducts];
    }

    // Se tiver muitos produtos relacionados, pega apenas 8 aleatórios
    return this.getRandomProducts(relatedProducts, 8);
  }

  // Seleciona produtos aleatórios
  getRandomProducts(products: Product[], count: number): Product[] {
    return products
      .filter(p => p.inStock)
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  }

  getProductMainImage(product: Product): string {
    // Obter a primeira imagem do primeiro cor disponível
    if (product.colors.length > 0) {
      const firstColor = product.colors[0];
      const images = product.imagesByColor[firstColor];
      if (images && images.length > 0) {
        return images[0];
      }
    }
    return 'https://placehold.co/300x300?text=Sem+Imagem';
  }

  quickAddToCart(product: Product): void {
    // Adicionar produto recomendado ao carrinho
    // Usar primeira cor e tamanho disponíveis (se houver)
    const color = product.colors.length > 0 ? product.colors[0] : '';
    const size = product.sizes.length > 0 ? product.sizes[0] : '';

    this.cartService.addItem({
      productId: product.id,
      name: product.title,
      price: product.price,
      imageUrl: this.getProductMainImage(product),
      quantity: 1,
      color: color,
      size: size,
      stockQuantity: product.stockQuantity
    });

    // Substituir o alert por uma notificação
    this.modalService.openNotificationModal(
      'success',
      'Produto adicionado',
      `${product.title} foi adicionado ao carrinho com sucesso!`,
      3000
    );
  }

  // Métodos para gerenciar itens salvados
  private loadSavedItems(): void {
    const savedItemsJson = localStorage.getItem(this.SAVED_ITEMS_KEY);
    if (savedItemsJson) {
      try {
        this.savedItems = JSON.parse(savedItemsJson);
      } catch (error) {
        console.error('Erro ao carregar itens salvados:', error);
        this.savedItems = [];
        this.modalService.openNotificationModal(
          'error',
          'Erro ao carregar itens salvos',
          'Não foi possível recuperar seus itens salvos para depois.',
          3000
        );
      }
    }
  }

  private updateSavedItems(): void {
    localStorage.setItem(this.SAVED_ITEMS_KEY, JSON.stringify(this.savedItems));
  }
}