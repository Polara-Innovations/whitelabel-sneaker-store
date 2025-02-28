import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { BannerComponent } from './components/home/banner/banner.component';
import { ProductsComponent } from './components/products/products.component';
import { AboutComponent } from './components/about/about.component';
import { AboutIntroComponent } from './components/about/about-intro/about-intro.component';
import { AboutMissionComponent } from './components/about/about-mission/about-mission.component';
import { AboutTeamComponent } from './components/about/about-team/about-team.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContactFormComponent } from './components/contact/contact-form/contact-form.component';
import { ContactInfoComponent } from './components/contact/contact-info/contact-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavItemComponent } from './layout/header/nav-item/nav-item.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { FaqComponent } from './components/faq/faq.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TabsMenuComponent } from './layout/header/tabs-menu/tabs-menu.component';
import { HamburgerMenuComponent } from './layout/header/hamburger-menu/hamburger-menu.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductCardComponent } from './components/shared/product-card/product-card.component';
import { ProductCarouselComponent } from './components/shared/product-carrousel/product-carrousel.component';
import { TitleComponent } from './components/shared/title/title.component';
import { SearchBarComponent } from './components/shared/search-bar/search-bar.component';
import { BrandCardComponent } from './components/shared/brand-card/brand-card.component';
import { BrandListComponent } from './components/shared/brand-list/brand-list.component';
import { CategoryCardComponent } from './components/shared/category-card/category-card.component';
import { CategoryListComponent } from './components/shared/category-list/category-list.component';
import { NavItemListComponent } from './layout/header/nav-item-list/nav-item-list.component';
import { SettingsModalComponent } from './layout/header/settings-modal/settings-modal.component';
import { ToggleComponent } from './components/shared/toggle/toggle.component';
import { CartModalComponent } from './layout/header/cart-modal/cart-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BannerComponent,
    ProductsComponent,
    AboutComponent,
    AboutIntroComponent,
    AboutMissionComponent,
    AboutTeamComponent,
    ContactComponent,
    ContactFormComponent,
    ContactInfoComponent,
    ProductDetailsComponent,
    NavItemComponent,
    ProfileComponent,
    FaqComponent,
    TabsMenuComponent,
    HamburgerMenuComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductCarouselComponent,
    TitleComponent,
    SearchBarComponent,
    BrandCardComponent,
    BrandListComponent,
    CategoryCardComponent,
    CategoryListComponent,
    NavItemListComponent,
    SettingsModalComponent,
    ToggleComponent,
    CartModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }