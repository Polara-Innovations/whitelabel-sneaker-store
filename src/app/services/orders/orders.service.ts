import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Order, OrderStatus } from '../../models/order.model';
import { environment } from '../../../environments/environment';
import { CartService } from '../cart/cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(
    private http: HttpClient,
    private cartService: CartService
  ) {}

  getOrders(): Observable<Order[]> {
    return of(this.getMockOrders());

    // return this.http.get<Order[]>(this.apiUrl).pipe(
    //   catchError(error => {
    //     console.error('Error fetching orders', error);
    //     return of(this.getMockOrders());
    //   })
    // );
  }

  getOrderById(id: number): Observable<Order | null> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching order with id ${id}`, error);
        const mockOrder = this.getMockOrders().find(order => order.id === id);
        return of(mockOrder || null);
      })
    );
  }

  cancelOrder(id: number, reason: string): Observable<boolean> {
    return this.http.post(`${this.apiUrl}/${id}/cancel`, { reason }).pipe(
      map(() => true),
      catchError(error => {
        console.error(`Error canceling order with id ${id}`, error);
        return of(true);
      })
    );
  }

  requestReturn(id: number, reason: string, items: number[]): Observable<boolean> {
    return this.http.post(`${this.apiUrl}/${id}/return`, { reason, items }).pipe(
      map(() => true),
      catchError(error => {
        console.error(`Error requesting return for order with id ${id}`, error);
        return of(true);
      })
    );
  }

  reorder(orderId: number): Observable<number | null> {
    return this.http.post<number>(`${this.apiUrl}/${orderId}/reorder`, {}).pipe(
      catchError(error => {
        console.error(`Error reordering order with id ${orderId}`, error);
        return of(null);
      })
    );
  }

  submitReview(orderId: number, itemId: number, rating: number, comment: string): Observable<boolean> {
    return this.http.post(`${this.apiUrl}/${orderId}/items/${itemId}/review`, { rating, comment }).pipe(
      map(() => true),
      catchError(error => {
        console.error(`Error submitting review for item ${itemId} in order ${orderId}`, error);
        return of(true);
      })
    );
  }

  getStatusLabel(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.PROCESSING:
        return 'Em processamento';
      case OrderStatus.CONFIRMED:
        return 'Confirmado';
      case OrderStatus.SHIPPED:
        return 'Enviado';
      case OrderStatus.DELIVERED:
        return 'Entregue';
      case OrderStatus.CANCELED:
        return 'Cancelado';
      case OrderStatus.RETURNED:
        return 'Devolvido';
      default:
        return 'Desconhecido';
    }
  }

  getStatusClass(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.PROCESSING:
        return 'status-processing';
      case OrderStatus.CONFIRMED:
        return 'status-confirmed';
      case OrderStatus.SHIPPED:
        return 'status-shipped';
      case OrderStatus.DELIVERED:
        return 'status-delivered';
      case OrderStatus.CANCELED:
        return 'status-canceled';
      case OrderStatus.RETURNED:
        return 'status-returned';
      default:
        return '';
    }
  }

  private getMockOrders(): Order[] {
    return [
      {
        id: 1,
        orderNumber: 'ORD-2023-001',
        customerId: 123,
        status: OrderStatus.DELIVERED,
        items: [
          {
            id: 101,
            productId: 201,
            name: 'Smartphone Galaxy S23',
            imageUrl: 'https://placehold.co/150?text=GalaxyS23',
            price: 4999.90,
            quantity: 1,
            color: 'Preto',
            reviewed: true
          },
          {
            id: 102,
            productId: 202,
            name: 'Capa Protetora',
            imageUrl: 'https://placehold.co/150?text=Capa',
            price: 99.90,
            quantity: 1,
            color: 'Transparente',
            reviewed: false
          }
        ],
        shipping: {
          address: {
            street: 'Rua das Flores',
            number: '123',
            complement: 'Apto 101',
            neighborhood: 'Centro',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01234-567',
            country: 'Brasil'
          },
          method: 'Entrega Expressa',
          trackingCode: 'BR123456789',
          trackingUrl: 'https://www.correios.com.br/rastreamento',
          estimatedDelivery: new Date('2023-06-15'),
          shippedDate: new Date('2023-06-10'),
          deliveredDate: new Date('2023-06-14'),
          cost: 25.90
        },
        payment: {
          method: 'Cartão de Crédito',
          status: 'approved',
          cardLastDigits: '1234',
          installments: 3,
          installmentValue: 1708.60,
          totalPaid: 5125.80
        },
        subtotal: 5099.80,
        discount: 0,
        total: 5125.80,
        createdAt: new Date('2023-06-08'),
        updatedAt: new Date('2023-06-14'),
        statusHistory: [
          {
            status: OrderStatus.PROCESSING,
            date: new Date('2023-06-08'),
            comment: 'Pedido recebido'
          },
          {
            status: OrderStatus.CONFIRMED,
            date: new Date('2023-06-09'),
            comment: 'Pagamento aprovado'
          },
          {
            status: OrderStatus.SHIPPED,
            date: new Date('2023-06-10'),
            comment: 'Pedido enviado via Entrega Expressa'
          },
          {
            status: OrderStatus.DELIVERED,
            date: new Date('2023-06-14'),
            comment: 'Entregue ao destinatário'
          }
        ],
        canCancel: false,
        canReturn: true
      },
      {
        id: 2,
        orderNumber: 'ORD-2023-002',
        customerId: 123,
        status: OrderStatus.SHIPPED,
        items: [
          {
            id: 201,
            productId: 301,
            name: 'Notebook Dell Inspiron',
            imageUrl: 'https://placehold.co/150?text=Notebook',
            price: 3999.90,
            quantity: 1,
            reviewed: false
          },
          {
            id: 202,
            productId: 302,
            name: 'Mouse sem fio',
            imageUrl: 'https://placehold.co/150?text=Mouse',
            price: 129.90,
            quantity: 1,
            color: 'Preto',
            reviewed: false
          },
          {
            id: 203,
            productId: 303,
            name: 'Teclado sem fio',
            imageUrl: 'https://placehold.co/150?text=Teclado',
            price: 199.90,
            quantity: 1,
            color: 'Preto',
            reviewed: false
          }
        ],
        shipping: {
          address: {
            street: 'Avenida Paulista',
            number: '1000',
            neighborhood: 'Bela Vista',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01310-100',
            country: 'Brasil'
          },
          method: 'Entrega Padrão',
          trackingCode: 'BR987654321',
          trackingUrl: 'https://www.correios.com.br/rastreamento',
          estimatedDelivery: new Date('2023-07-05'),
          shippedDate: new Date('2023-06-30'),
          cost: 0
        },
        payment: {
          method: 'Boleto Bancário',
          status: 'approved',
          totalPaid: 4329.70
        },
        subtotal: 4329.70,
        discount: 0,
        total: 4329.70,
        createdAt: new Date('2023-06-28'),
        updatedAt: new Date('2023-06-30'),
        statusHistory: [
          {
            status: OrderStatus.PROCESSING,
            date: new Date('2023-06-28'),
            comment: 'Pedido recebido'
          },
          {
            status: OrderStatus.CONFIRMED,
            date: new Date('2023-06-29'),
            comment: 'Pagamento aprovado'
          },
          {
            status: OrderStatus.SHIPPED,
            date: new Date('2023-06-30'),
            comment: 'Pedido enviado via Entrega Padrão'
          }
        ],
        canCancel: true,
        canReturn: false
      },
      {
        id: 3,
        orderNumber: 'ORD-2023-003',
        customerId: 123,
        status: OrderStatus.PROCESSING,
        items: [
          {
            id: 301,
            productId: 401,
            name: 'Tênis Nike Air',
            imageUrl: 'https://placehold.co/150?text=Tenis',
            price: 299.90,
            quantity: 2,
            size: '42',
            color: 'Preto',
            reviewed: false
          }
        ],
        shipping: {
          address: {
            street: 'Rua Augusta',
            number: '500',
            neighborhood: 'Consolação',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01305-000',
            country: 'Brasil'
          },
          method: 'Entrega Padrão',
          estimatedDelivery: new Date('2023-07-10'),
          cost: 15.90
        },
        payment: {
          method: 'Cartão de Débito',
          status: 'pending',
          totalPaid: 615.70
        },
        subtotal: 599.80,
        discount: 0,
        total: 615.70,
        createdAt: new Date('2023-07-05'),
        updatedAt: new Date('2023-07-05'),
        statusHistory: [
          {
            status: OrderStatus.PROCESSING,
            date: new Date('2023-07-05'),
            comment: 'Pedido recebido'
          }
        ],
        canCancel: true,
        canReturn: false
      },
    ];
    };  
  }      
