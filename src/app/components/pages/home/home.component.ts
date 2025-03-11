import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { Brand } from '../../../models/brand.model';
import { Category } from '../../../models/category.model';
import { Banner } from '../../../models/banner.model';
import { ProductsService } from '../../../services/api/products/products.service';
import { BrandService } from '../../../services/api/brand/brand.service';
import { CategoryService } from '../../../services/api/category/category.service';
import { BannerService } from '../../../services/api/banner/banner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  brands: Brand[] = [];
  categories: Category[] = [];
  banners: Banner[] = [];
  isLoading = true;

  constructor(
    private productService: ProductsService,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private bannerService: BannerService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // Carregar produtos em destaque
    this.productService.getProducts().subscribe({
      next: (response) => {
        // Podemos selecionar os produtos em destaque por algum critério
        // Por exemplo, os mais recentes ou os mais vendidos
        this.featuredProducts = response.products
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
        this.isLoading = false;
      }
    });

    // Carregar marcas
    this.brandService.getBrands().subscribe({
      next: (brands) => {
        this.brands = brands;
      },
      error: (error) => {
        console.error('Erro ao carregar marcas:', error);
      }
    });

    // Carregar categorias
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Erro ao carregar categorias:', error);
      }
    });

    // Carregar banners
    this.bannerService.getBanners().subscribe({
      next: (banners) => {
        this.banners = banners;
      },
      error: (error) => {
        console.error('Erro ao carregar banners:', error);
      }
    });
  }
}