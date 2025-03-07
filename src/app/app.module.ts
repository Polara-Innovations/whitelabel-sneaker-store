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
import { ContactComponent } from './components/contact/contact.component';
import { ContactFormComponent } from './components/contact/contact-form/contact-form.component';
import { ContactInfoComponent } from './components/contact/contact-info/contact-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavItemComponent } from './layout/header/nav-item/nav-item.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { FaqComponent } from './components/faq/faq.component';
import { TabsMenuComponent } from './layout/header/tabs-menu/tabs-menu.component';
import { HamburgerMenuComponent } from './layout/header/hamburger-menu/hamburger-menu.component';
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
import { SafePipe } from './pipes/safe/safe.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductSearchComponent } from './components/products/product-search/product-search.component';
import { ProductFiltersComponent } from './components/products/product-filters/product-filters.component';
import { ProductSortComponent } from './components/products/product-sort/product-sort.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { faqItemComponent } from './components/faq/faq-item/faq-item.component';
import { NavItemDropdownComponent } from './layout/header/nav-item-dropdown/nav-item-dropdown.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TeamSectionComponent } from './components/about-us/team-section/team-section.component';
import { MissionVisionValuesComponent } from './components/about-us/mission-vision-values/mission-vision-values.component';
import { ContentSectionsComponent } from './components/about-us/content-sections/content-sections.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BannerComponent,
    ProductsComponent,
    ProductSearchComponent,
    ProductFiltersComponent,
    ProductSortComponent,
    AboutUsComponent,
    TeamSectionComponent,
    MissionVisionValuesComponent,
    ContentSectionsComponent,
    ContactComponent,
    ContactFormComponent,
    ContactInfoComponent,
    ProductDetailsComponent,
    NavItemComponent,
    FaqComponent,
    TabsMenuComponent,
    HamburgerMenuComponent,
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
    CartModalComponent,
    SafePipe,
    faqItemComponent,
    NavItemDropdownComponent,
    TeamSectionComponent  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }