import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AboutUsData } from '../../../models/about-us.model';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {
  private apiUrl = `${environment.apiUrl}/about-us`;

  constructor(private http: HttpClient) { }

  getAboutUs(): Observable<AboutUsData[]> {
    // return this.http.get<AboutUsData[]>(this.apiUrl)
    //   .pipe(
    //     catchError(() => this.getMockedAboutUs())
    //   );
    return this.getMockedAboutUs();
  }

  private getMockedAboutUs(): Observable<AboutUsData[]> {
    return of([
      {
      "pageTitle": "Sobre Nós",
      "pageSubtitle": "Conheça mais sobre a Sneaker Store e nossa equipe",
      
      "teamSection": {
        "title": "Nossa Equipe",
        "subtitle": "Conheça as pessoas por trás da Sneaker Store",
        "members": [
        {
          "id": "1",
          "name": "João Silva",
          "position": "CEO & Fundador",
          "photoUrl": "https://picsum.photos/800/600?random=1",
          "description": "João fundou a Sneaker Store em 2015 com a visão de criar uma experiência única para os amantes de tênis. Com mais de 15 anos de experiência no mercado de calçados, ele lidera a empresa com paixão e inovação.",
          "socialLinks": {
          "linkedin": "https://linkedin.com/in/joaosilva",
          "twitter": "https://twitter.com/joaosilva",
          "instagram": "https://instagram.com/joaosilva"
          }
        },
        {
          "id": "2",
          "name": "Maria Oliveira",
          "position": "Diretora de Marketing",
          "photoUrl": "https://picsum.photos/800/600?random=2",
          "description": "Maria traz mais de 10 anos de experiência em marketing digital. Ela é responsável por todas as estratégias de marca e campanhas que tornaram a Sneaker Store reconhecida nacionalmente.",
          "socialLinks": {
          "linkedin": "https://linkedin.com/in/mariaoliveira",
          "instagram": "https://instagram.com/mariaoliveira"
          }
        },
        {
          "id": "3",
          "name": "Carlos Santos",
          "position": "Diretor de Produto",
          "photoUrl": "https://picsum.photos/800/600?random=3",
          "description": "Carlos é apaixonado por tênis desde a infância. Ele lidera nossa equipe de produto, garantindo que tenhamos sempre as melhores e mais exclusivas opções para nossos clientes.",
          "socialLinks": {
          "linkedin": "https://linkedin.com/in/carlossantos",
          "twitter": "https://twitter.com/carlossantos"
          }
        },
        {
          "id": "4",
          "name": "Ana Pereira",
          "position": "Gerente de Atendimento",
          "photoUrl": "https://picsum.photos/800/600?random=4",
          "description": "Ana acredita que um excelente atendimento ao cliente é a chave para o sucesso. Ela lidera nossa equipe de suporte, garantindo que cada cliente tenha uma experiência incrível.",
          "socialLinks": {
          "linkedin": "https://linkedin.com/in/anapereira"
          }
        }
        ]
      },
      
      "missionVisionValuesSection": {
        "title": "Missão, Visão e Valores",
        "subtitle": "O que nos guia e inspira todos os dias",
        "data": {
        "mission": "Nossa missão é conectar pessoas com sua paixão por tênis, oferecendo produtos de qualidade, atendimento excepcional e uma experiência de compra única.",
        "vision": "Ser reconhecida como a melhor e mais inovadora loja de tênis do Brasil, criando tendências e inspirando pessoas a expressarem sua personalidade através do estilo.",
        "values": [
          {
          "id": "v1",
          "title": "Qualidade",
          "description": "Compromisso com a excelência em tudo o que fazemos, desde a seleção de produtos até o atendimento ao cliente.",
          "icon": "fas fa-award"
          },
          {
          "id": "v2",
          "title": "Autenticidade",
          "description": "Valorizamos a originalidade e incentivamos cada um a expressar seu estilo único.",
          "icon": "fas fa-fingerprint"
          },
          {
          "id": "v3",
          "title": "Inovação",
          "description": "Buscamos constantemente novas ideias e soluções para melhorar a experiência de nossos clientes.",
          "icon": "fas fa-lightbulb"
          },
          {
          "id": "v4",
          "title": "Paixão",
          "description": "Somos apaixonados por tênis e essa paixão se reflete em tudo o que fazemos.",
          "icon": "fas fa-heart"
          },
          {
          "id": "v5",
          "title": "Comunidade",
          "description": "Acreditamos no poder de construir uma comunidade forte de amantes de tênis e cultura urbana.",
          "icon": "fas fa-users"
          }
        ]
        }
      },
      
      "contentSections": {
        "title": "Nossa História",
        "subtitle": "Como construímos a Sneaker Store ao longo dos anos",
        "sections": [
        {
          "id": "cs1",
          "title": "Como Tudo Começou",
          "description": "A Sneaker Store nasceu em 2015, em uma pequena loja no centro de São Paulo. O que começou como um sonho de João Silva, um colecionador apaixonado por tênis, rapidamente se transformou em um hub para entusiastas de sneakers. Nos primeiros meses, a loja funcionava apenas com João e dois amigos, mas a paixão e dedicação logo atraíram uma clientela fiel.",
          "imageUrl": "https://picsum.photos/800/600?random=5",
          "alignment": "right"
        },
        {
          "id": "cs2",
          "title": "Crescimento e Expansão",
          "description": "Em 2018, após três anos de sucesso crescente, abrimos nossa segunda loja e lançamos nossa plataforma de e-commerce. Este foi um passo crucial que nos permitiu atender clientes em todo o Brasil. Nossa equipe cresceu para mais de 30 colaboradores apaixonados, e começamos a realizar eventos e colaborações exclusivas com marcas e artistas locais.",
          "imageUrl": "https://picsum.photos/800/600?random=6",
          "alignment": "left"
        },
        {
          "id": "cs3",
          "title": "Onde Estamos Hoje",
          "description": "Atualmente, a Sneaker Store é reconhecida como uma das principais referências em tênis e cultura urbana no Brasil. Contamos com cinco lojas físicas, uma plataforma digital robusta e uma comunidade de mais de 500 mil seguidores nas redes sociais. Nosso compromisso com a qualidade, autenticidade e atendimento excepcional permanece o mesmo desde o primeiro dia.",
          "imageUrl": "https://picsum.photos/800/600?random=7",
          "alignment": "right"
        }
        ]
      }
      }
    ]);
  }
}