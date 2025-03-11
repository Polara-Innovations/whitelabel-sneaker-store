import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../services/orders/orders.service';
import { Order, OrderStatus } from '../../../models/order.model'
import { Router } from '@angular/router';
import { ModalService } from '../../../services/modal/modal.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  standalone: false
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  loading: boolean = true;
  
  // Filtros
  statusFilter: OrderStatus | 'all' = 'all';
  sortOrder: 'newest' | 'oldest' = 'newest';
  searchTerm: string = '';

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.ordersService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading orders', error);
        this.modalService.openNotificationModal(
          'error',
          'Erro ao carregar pedidos',
          'Não foi possível carregar o histórico de pedidos. Por favor, tente novamente mais tarde.',
          5000
        );
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    let result = [...this.orders];

    // Aplicar filtro de status
    if (this.statusFilter !== 'all') {
      result = result.filter(order => order.status === this.statusFilter);
    }

    // Aplicar pesquisa
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      result = result.filter(order => 
        order.orderNumber.toLowerCase().includes(term) ||
        order.items.some(item => item.name.toLowerCase().includes(term))
      );
    }

    // Aplicar ordenação
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return this.sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    this.filteredOrders = result;
  }

  changeStatusFilter(status: OrderStatus | 'all'): void {
    this.statusFilter = status;
    this.applyFilters();
  }

  changeSortOrder(sort: 'newest' | 'oldest'): void {
    this.sortOrder = sort;
    this.applyFilters();
  }

  search(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  viewOrderDetails(orderId: number): void {
    this.router.navigate(['/order-details', orderId]);
  }

  reorder(event: Event, orderId: number): void {
    event.stopPropagation();
    
    this.modalService.openConfirmationModal(
      'Repetir pedido',
      'Deseja adicionar todos os itens deste pedido ao seu carrinho?',
      'Confirmar',
      'Cancelar'
    ).subscribe(result => {
      if (result) {
        this.ordersService.reorder(orderId).subscribe({
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

  getStatusLabel(status: OrderStatus): string {
    return this.ordersService.getStatusLabel(status);
  }

  getStatusClass(status: OrderStatus): string {
    return this.ordersService.getStatusClass(status);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}