import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: false
})
export class ProfileComponent {
  user: any;

  constructor(private settingsService: SettingsService) {
    this.user = {
      name: 'João Silva',
      email: 'joao.silva@example.com',
      options: [
        { name: 'Editar Perfil', route: '/profile/edit' },
        { name: 'Meus Pedidos', route: '/orders' },
        { name: 'Sair', route: '/logout' }
      ]
    };
  }
}