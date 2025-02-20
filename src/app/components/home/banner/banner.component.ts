import { Component, Input, OnInit } from '@angular/core';
import { Banner } from '../../../models/banner.model';

@Component({
  standalone: false,
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit {
  @Input() banners: Banner[] = [];
  currentIndex = 0;
  interval: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    clearInterval(this.interval); // Limpa o intervalo ao destruir o componente
  }

  startAutoSlide() {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 3000); // Troca a imagem a cada 3 segundos
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.banners.length;
  }

  selectSlide(index: number) {
    this.currentIndex = index;
  }

  navigate(route: string) {
    // Navega para a rota especificada ao clicar na imagem
    // (Você pode implementar o Router se estiver usando Angular Router)
    console.log(`Navegando para: ${route}`);
  }
}