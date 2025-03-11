import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart/cart.service';
import { WishlistItem, WishlistService } from '../../../services/wishlist/wishlist.service';
import { Subscription } from 'rxjs';
import { ModalService } from '../../../services/modal/modal.service';
import { ProductsService } from '../../../services/api/products/products.service';
import { Product } from '../../../models/product.model';

@Component({
selector: 'app-wishlist',
templateUrl: './wishlist.component.html',
styleUrls: ['./wishlist.component.css'],
standalone: false
})
export class WishlistComponent implements OnInit, OnDestroy {
wishlistItems: WishlistItem[] = [];
recommendedProducts: Product[] = [];
priceChangeNotifications: boolean = false;
availabilityNotifications: boolean = false;
isMobile: boolean = window.innerWidth <= 768;

private wishlistSubscription?: Subscription;

constructor(
private wishlistService: WishlistService,
private cartService: CartService,
private router: Router,
private modalService: ModalService,
private productService: ProductsService
) { }

ngOnInit(): void {
this.wishlistSubscription = this.wishlistService.wishlist$.subscribe(items => {
this.wishlistItems = items;
this.loadRecommendedProducts();
});

// Carregar produtos recomendados inicialmente
this.loadRecommendedProducts();
}

ngOnDestroy(): void {
if (this.wishlistSubscription) {
this.wishlistSubscription.unsubscribe();
}
}

formatCurrency(value: number): string {
return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

getAvailableItemsCount(): number {
  return this.wishlistItems.filter(item => item.available).length;
}

getTotalPrice(): number {
  return this.wishlistItems.reduce((sum, item) => sum + item.price, 0);
}

addToCart(item: WishlistItem): void {
if (item.available) {
this.cartService.addItem({
productId: item.productId,
name: item.name,
price: item.price,
imageUrl: item.imageUrl,
quantity: 1,
color: item.color || '',
size: item.size || '',
stockQuantity: item.stockQuantity || 10
});

  this.modalService.openNotificationModal(
    'success',
    'Produto adicionado',
    `${item.name} foi adicionado ao carrinho com sucesso!`,
    3000
  );
}
}

removeFromWishlist(item: WishlistItem, event?: Event): void {
if (event) {
event.preventDefault();
event.stopPropagation();
}

this.wishlistService.removeItem(item);

this.modalService.openNotificationModal(
  'info',
  'Item removido',
  `${item.name} foi removido da sua lista de desejos.`,
  3000
);
}

moveToCartAndRemove(item: WishlistItem): void {
this.addToCart(item);
this.removeFromWishlist(item);

this.modalService.openNotificationModal(
  'success',
  'Item movido para o carrinho',
  `${item.name} foi movido para seu carrinho e removido da lista de desejos.`,
  3000
);
}

shareByEmail(): void {
const subject = 'Confira minha lista de desejos!';
const body = `Aqui estão os itens da minha lista de desejos:\n\n${this.generateWishlistText()}`;
const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
window.location.href = mailtoLink;

this.modalService.openNotificationModal(
  'info',
  'Compartilhamento por e-mail',
  'Seu cliente de e-mail foi aberto com sua lista de desejos.',
  3000
);
}

shareOnSocialMedia(): void {
const text = 'Confira minha lista de desejos!';
const url = window.location.href;
const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
window.open(twitterLink, '_blank');

this.modalService.openNotificationModal(
  'info',
  'Compartilhamento nas redes sociais',
  'Sua lista de desejos está pronta para ser compartilhada no Twitter.',
  3000
);
}

getShareableLink(): void {
const url = window.location.href;
navigator.clipboard.writeText(url).then(() => {
this.modalService.openNotificationModal(
'success',
'Link copiado',
'Link da sua lista de desejos copiado para a área de transferência!',
3000
);
});
}

continueShopping(): void {
this.router.navigate(['/products']);
}

private generateWishlistText(): string {
return this.wishlistItems.map(item => `${item.name} - ${this.formatCurrency(item.price)}`).join('\n');
}

// Métodos para lidar com produtos recomendados
loadRecommendedProducts(): void {
  this.productService.getProducts().subscribe({
    next: (response) => {
      // Filtra produtos que não estão na lista de desejos
      const wishlistProductIds = this.wishlistItems.map(item => item.productId);
      
      // Pega até 8 produtos aleatórios que estejam em estoque e não na lista de desejos
      this.recommendedProducts = response.products
        .filter(p => p.inStock && !wishlistProductIds.includes(p.id))
        .sort(() => 0.5 - Math.random())
        .slice(0, 8);
    },
    error: (error) => {
      console.error('Erro ao carregar produtos recomendados:', error);
      this.modalService.openNotificationModal(
        'error',
        'Erro ao carregar produtos',
        'Não foi possível carregar os produtos recomendados.',
        3000
      );
    }
  });
}

onProductCardAction(product: Product): void {
  // Adicionar o produto ao carrinho
  this.quickAddToCart(product);

  // Remover o produto dos recomendados
  this.recommendedProducts = this.recommendedProducts.filter(p => p.id !== product.id);
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

  this.modalService.openNotificationModal(
    'success',
    'Produto adicionado',
    `${product.title} foi adicionado ao carrinho com sucesso!`,
    3000
  );
}
}