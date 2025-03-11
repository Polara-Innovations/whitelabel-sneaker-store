import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../../services/orders/orders.service';
import { Order, OrderStatus, OrderItem } from '../../../models/order.model'
import { ModalService } from '../../../services/modal/modal.service';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  standalone: false
})
export class OrderDetailsComponent implements OnInit {
  order: Order | null = null;
  loading: boolean = true;
  cancelReason: string = '';
  returnReason: string = '';
  selectedReturnItems: number[] = [];
  reviewRating: number = 0;
  reviewComment: string = '';
  reviewItemId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService,
    private modalService: ModalService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const orderId = Number(params.get('id'));
      if (orderId) {
        this.loadOrderDetails(orderId);
      } else {
        this.router.navigate(['/orders']);
      }
    });
  }

  loadOrderDetails(orderId: number): void {
    this.loading = true;
    this.ordersService.getOrderById(orderId).subscribe({
      next: (order) => {
        this.order = order;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading order details', error);
        this.modalService.openNotificationModal(
          'error',
          'Erro ao carregar detalhes',
          'Não foi possível carregar os detalhes do pedido. Por favor, tente novamente mais tarde.',
          5000
        );
        this.loading = false;
        this.router.navigate(['/orders']);
      }
    });
  }

  openCancelModal(): void {
    if (!this.order) return;

    this.modalService.openConfirmationModal(
      'Cancelar pedido',
      'Tem certeza que deseja cancelar este pedido? Esta ação não pode ser desfeita.',
      'Confirmar',
      'Voltar'
    ).subscribe(result => {
      if (result) {
        this.showCancelReasonModal();
      }
    });
  }

  showCancelReasonModal(): void {
    // Aqui você pode usar um modal personalizado para capturar a razão do cancelamento
    // Por simplicidade, estou usando o modal de confirmação com um prompt fictício
    this.cancelReason = prompt('Por favor, informe o motivo do cancelamento:') || '';

    if (this.cancelReason && this.order) {
      this.ordersService.cancelOrder(this.order.id, this.cancelReason).subscribe({
        next: (success) => {
          if (success) {
            this.modalService.openNotificationModal(
              'success',
              'Pedido cancelado',
              'Seu pedido foi cancelado com sucesso.',
              3000
            );
            // Recarregar os detalhes do pedido
            this.loadOrderDetails(this.order!.id);
          } else {
            this.modalService.openNotificationModal(
              'error',
              'Erro ao cancelar',
              'Não foi possível cancelar seu pedido. Por favor, entre em contato com o suporte.',
              5000
            );
          }
        }
      });
    }
  }

  openReturnModal(): void {
    if (!this.order) return;

    // Reset selected items
    this.selectedReturnItems = [];
    this.returnReason = '';

    this.modalService.openConfirmationModal(
      'Solicitar devolução',
      'Selecione os itens que deseja devolver e informe o motivo.',
      'Confirmar',
      'Cancelar'
    ).subscribe(result => {
      if (result) {
        this.showReturnItemsModal();
      }
    });
  }

  showReturnItemsModal(): void {
    // Aqui você implementaria um modal personalizado para selecionar itens e informar o motivo
    // Por simplicidade, estou simulando com prompts
    this.returnReason = prompt('Por favor, informe o motivo da devolução:') || '';

    // Simular seleção de todos os itens
    if (this.order && this.returnReason) {
      this.selectedReturnItems = this.order.items.map(item => item.id);

      this.ordersService.requestReturn(this.order.id, this.returnReason, this.selectedReturnItems).subscribe({
        next: (success) => {
          if (success) {
            this.modalService.openNotificationModal(
              'success',
              'Solicitação enviada',
              'Sua solicitação de devolução foi enviada com sucesso. Você receberá atualizações por e-mail.',
              3000
            );
            // Recarregar os detalhes do pedido
            this.loadOrderDetails(this.order!.id);
          } else {
            this.modalService.openNotificationModal(
              'error',
              'Erro na solicitação',
              'Não foi possível processar sua solicitação de devolução. Por favor, entre em contato com o suporte.',
              5000
            );
          }
        }
      });
    }
  }

  addItemToCart(item: OrderItem): void {
    this.cartService.addItem({
      productId: item.productId,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      quantity: 1,
      color: item.color || '',
      size: item.size || '',
      stockQuantity: 999 // Assumindo disponibilidade
    });

    this.modalService.openNotificationModal(
      'success',
      'Item adicionado',
      `${item.name} foi adicionado ao seu carrinho.`,
      3000
    );
  }

  reorderAll(): void {
    if (!this.order) return;

    this.modalService.openConfirmationModal(
      'Repetir pedido',
      'Deseja adicionar todos os itens deste pedido ao seu carrinho?',
      'Confirmar',
      'Cancelar'
    ).subscribe(result => {
      if (result) {
        this.ordersService.reorder(this.order!.id).subscribe({
          next: (newOrderId) => {
            if (newOrderId) {
              this.modalService.openNotificationModal(
                'success',
                'Pedido repetido',
                'Os itens foram adicionados ao seu carrinho.',
                3000
              );
              this.router.navigate(['/cart']);
            } else {
              this.modalService.openNotificationModal(
                'error',
                'Erro ao repetir pedido',
                'Não foi possível adicionar os itens ao carrinho.',
                5000
              );
            }
          }
        });
      }
    });
  }

  openReviewModal(item: OrderItem): void {
    if (item.reviewed) {
      this.modalService.openNotificationModal(
        'info',
        'Avaliação já realizada',
        'Você já avaliou este produto anteriormente.',
        3000
      );
      return;
    }

    this.reviewItemId = item.id;
    this.reviewRating = 0;
    this.reviewComment = '';

    // Aqui você implementaria um modal personalizado para avaliação
    // Por simplicidade, estou simulando com prompts
    const rating = prompt('Avalie de 1 a 5 estrelas:');
    if (rating && !isNaN(Number(rating))) {
      this.reviewRating = Math.min(5, Math.max(1, Number(rating)));
      this.reviewComment = prompt('Comentário (opcional):') || '';

      this.submitReview();
    }
  }

  submitReview(): void {
    if (!this.order || this.reviewItemId === null || this.reviewRating === 0) return;

    this.ordersService.submitReview(
      this.order.id,
      this.reviewItemId,
      this.reviewRating,
      this.reviewComment
    ).subscribe({
      next: (success) => {
        if (success) {
          this.modalService.openNotificationModal(
            'success',
            'Avaliação enviada',
            'Obrigado por avaliar este produto!',
            3000
          );
          // Recarregar os detalhes do pedido
          this.loadOrderDetails(this.order!.id);
        } else {
          this.modalService.openNotificationModal(
            'error',
            'Erro ao enviar avaliação',
            'Não foi possível enviar sua avaliação. Por favor, tente novamente mais tarde.',
            5000
          );
        }
      }
    });
  }

  openTrackingInfo(): void {
    if (!this.order || !this.order.shipping.trackingUrl) return;

    window.open(this.order.shipping.trackingUrl, '_blank');
  }

  getStatusLabel(status: OrderStatus): string {
    return this.ordersService.getStatusLabel(status);
  }

  getStatusClass(status: OrderStatus): string {
    return this.ordersService.getStatusClass(status);
  }

  formatDate(date: Date | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('pt-BR');
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  goBack(): void {
    this.router.navigate(['/orders']);
  }

  // Determina a etapa atual do pedido para a timeline
  getCurrentStep(): number {
    if (!this.order) return 0;

    switch (this.order.status) {
      case OrderStatus.PROCESSING:
        return 1;
      case OrderStatus.CONFIRMED:
        return 2;
      case OrderStatus.SHIPPED:
        return 3;
      case OrderStatus.DELIVERED:
        return 4;
      case OrderStatus.CANCELED:
      case OrderStatus.RETURNED:
        return 0; // Status especial para cancelado/devolvido
      default:
        return 0;
    }
  }

  // Verifica se o status está concluído na timeline
  isStepCompleted(step: number): boolean {
    const currentStep = this.getCurrentStep();

    // Se o pedido foi cancelado ou devolvido, nenhum step está completo
    if (currentStep === 0) return false;

    return step < currentStep;
  }

  // Verifica se o status é o atual na timeline
  isCurrentStep(step: number): boolean {
    return step === this.getCurrentStep();
  }
}