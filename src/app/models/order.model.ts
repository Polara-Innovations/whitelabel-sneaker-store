// order.model.ts

export enum OrderStatus {
    PROCESSING = 'processing',
    CONFIRMED = 'confirmed',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    CANCELED = 'canceled',
    RETURNED = 'returned'
  }
  
  export interface OrderItem {
    id: number;
    productId: number;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
    color?: string;
    size?: string;
    reviewed: boolean;
  }
  
  export interface ShippingInfo {
    address: {
      street: string;
      number: string;
      complement?: string;
      neighborhood: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    method: string;
    trackingCode?: string;
    trackingUrl?: string;
    estimatedDelivery?: Date;
    shippedDate?: Date;
    deliveredDate?: Date;
    cost: number;
  }
  
  export interface PaymentInfo {
    method: string;
    status: 'pending' | 'approved' | 'rejected' | 'refunded';
    cardLastDigits?: string;
    installments?: number;
    installmentValue?: number;
    totalPaid: number;
  }
  
  export interface OrderStatusHistory {
    status: OrderStatus;
    date: Date;
    comment?: string;
  }
  
  export interface Order {
    id: number;
    orderNumber: string;
    customerId: number;
    status: OrderStatus;
    items: OrderItem[];
    shipping: ShippingInfo;
    payment: PaymentInfo;
    subtotal: number;
    discount: number;
    total: number;
    createdAt: Date;
    updatedAt: Date;
    statusHistory: OrderStatusHistory[];
    canCancel: boolean;
    canReturn: boolean;
  }
  
  export interface OrderFilter {
    status?: OrderStatus | 'all';
    startDate?: Date;
    endDate?: Date;
    searchTerm?: string;
  }
  
  export interface OrderSortOptions {
    field: 'createdAt' | 'total' | 'status';
    direction: 'asc' | 'desc';
  }
  
  export interface ReturnRequest {
    orderId: number;
    items: number[]; // IDs dos itens a serem devolvidos
    reason: string;
    comments?: string;
  }
  
  export interface CancelRequest {
    orderId: number;
    reason: string;
    comments?: string;
  }
  
  export interface ReviewSubmission {
    orderId: number;
    itemId: number;
    rating: number; // 1-5
    comment: string;
    images?: string[]; // URLs das imagens enviadas
  }