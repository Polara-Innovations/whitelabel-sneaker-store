import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css', '../../../shared/css/checkout-shared.css'],
  standalone: false
})
export class OrderConfirmationComponent implements OnInit {
  orderNumber: string = '';
  orderDate: Date = new Date();
  estimatedDelivery: Date = new Date();

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orderNumber = params['orderNumber'];
      
      if (!this.orderNumber) {
        // Redirecionar para a página inicial se não houver número de pedido
        this.router.navigate(['/']);
      }
      
      // Calcular data estimada de entrega (7 dias úteis a partir de hoje)
      this.estimatedDelivery = this.addBusinessDays(new Date(), 7);
    });
  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }

  viewOrder(): void {
    this.router.navigate(['/account/orders', this.orderNumber]);
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit',
      year: 'numeric' 
    });
  }

  private addBusinessDays(date: Date, days: number): Date {
    const result = new Date(date);
    let addedDays = 0;
    
    while (addedDays < days) {
      result.setDate(result.getDate() + 1);
      // Pular finais de semana (0 = domingo, 6 = sábado)
      if (result.getDay() !== 0 && result.getDay() !== 6) {
        addedDays++;
      }
    }
    
    return result;
  }
}