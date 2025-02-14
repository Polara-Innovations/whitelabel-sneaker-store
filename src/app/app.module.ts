import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { FeaturedProductsComponent } from './components/home/featured-products/featured-products.component';
import { BannerComponent } from './components/home/banner/banner.component';
import { ProductsComponent } from './components/products/products.component';
import { AboutComponent } from './components/about/about.component';
import { AboutIntroComponent } from './components/about/about-intro/about-intro.component';
import { AboutMissionComponent } from './components/about/about-mission/about-mission.component';
import { AboutTeamComponent } from './components/about/about-team/about-team.component';
import { ProductItemComponent } from './components/products/product-item/product-item.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContactFormComponent } from './components/contact/contact-form/contact-form.component';
import { ContactInfoComponent } from './components/contact/contact-info/contact-info.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavItemComponent } from './layout/header/nav-item/nav-item.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RelatedProductsComponent } from './components/product-details/related-products/related-products.component';
import { ProductInfoComponent } from './components/product-details/product-info/product-info.component';
import { FaqComponent } from './components/faq/faq.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TopNavbarComponent } from './layout/header/top-navbar/top-navbar.component';
import { HamburgerMenuComponent } from './layout/header/hamburger-menu/hamburger-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    FeaturedProductsComponent,
    BannerComponent,
    ProductsComponent,
    ProductItemComponent,
    AboutComponent,
    AboutIntroComponent,
    AboutMissionComponent,
    AboutTeamComponent,
    ContactComponent,
    ContactFormComponent,
    ContactInfoComponent,
    ProductDetailsComponent,
    NavItemComponent,
    ProductInfoComponent,
    RelatedProductsComponent,
    ProfileComponent,
    FaqComponent,
    TopNavbarComponent,
    HamburgerMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }