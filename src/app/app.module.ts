import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { BannerComponent } from './components/pages/home/banner/banner.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { ContactFormComponent } from './components/pages/contact/contact-form/contact-form.component';
import { ContactInfoComponent } from './components/pages/contact/contact-info/contact-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavItemComponent } from './components/layout/header/nav-item/nav-item.component';
import { ProductDetailsComponent } from './components/pages/product-details/product-details.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { TabsMenuComponent } from './components/layout/header/tabs-menu/tabs-menu.component';
import { HamburgerMenuComponent } from './components/layout/header/hamburger-menu/hamburger-menu.component';
import { ProductCardComponent } from './components/shared/components/product-card/product-card.component';
import { ProductCarouselComponent } from './components/shared/components/product-carrousel/product-carrousel.component';
import { TitleComponent } from './components/shared/components/title/title.component';
import { SearchBarComponent } from './components/shared/components/search-bar/search-bar.component';
import { BrandCardComponent } from './components/shared/components/brand-card/brand-card.component';
import { BrandListComponent } from './components/shared/components/brand-list/brand-list.component';
import { CategoryCardComponent } from './components/shared/components/category-card/category-card.component';
import { CategoryListComponent } from './components/shared/components/category-list/category-list.component';
import { NavItemListComponent } from './components/layout/header/nav-item-list/nav-item-list.component';
import { SettingsModalComponent } from './components/layout/header/settings-modal/settings-modal.component';
import { ToggleComponent } from './components/shared/components/toggle/toggle.component';
import { CartModalComponent } from './components/layout/header/cart-modal/cart-modal.component';
import { SafePipe } from './pipes/safe/safe.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductSearchComponent } from './components/pages/products/product-search/product-search.component';
import { ProductFiltersComponent } from './components/pages/products/product-filters/product-filters.component';
import { ProductSortComponent } from './components/pages/products/product-sort/product-sort.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { faqItemComponent } from './components/pages/faq/faq-item/faq-item.component';
import { NavItemDropdownComponent } from './components/layout/header/nav-item-dropdown/nav-item-dropdown.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { TeamSectionComponent } from './components/pages/about-us/team-section/team-section.component';
import { MissionVisionValuesComponent } from './components/pages/about-us/mission-vision-values/mission-vision-values.component';
import { ContentSectionsComponent } from './components/pages/about-us/content-sections/content-sections.component';
import { ModalsContainerComponent } from './components/shared/components/modals-container/modals-container.component';
import { InfoModalComponent } from './components/shared/components/modals/info-modal/info-modal.component';
import { ErrorModalComponent } from './components/shared/components/modals/error-modal/error-modal.component';
import { TermsModalComponent } from './components/layout/footer/modals/terms-modal/terms-modal.component';
import { CookiesModalComponent } from './components/layout/footer/modals/cookies-modal/cookies-modal.component';
import { PrivacyModalComponent } from './components/layout/footer/modals/privacy-modal/privacy-modal.component';
import { WarningModalComponent } from './components/shared/components/modals/warning-modal/warning-modal.component';
import { ConfirmationModalComponent } from './components/shared/components/modals/confirmation-modal/confirmation-modal.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { NotificationModalComponent } from './components/shared/components/modals/notification-modal/notification-modal.component';
import { OrdersComponent } from './components/pages/orders/orders.component';
import { OrderDetailsComponent } from './components/pages/order-details/order-details.component';
import { MainSectionTitleComponent } from './components/shared/components/main-section-title/main-section-title.component';
import { WishlistComponent } from './components/pages/wishlist/wishlist.component';
import { CheckoutWizardComponent } from './components/pages/checkout/checkout-wizard/checkout-wizard.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { CheckoutSummaryComponent } from './components/pages/checkout/checkout-summary/checkout-summary.component';
import { CheckoutReviewComponent } from './components/pages/checkout/checkout-review/checkout-review.component';
import { CheckoutPaymentComponent } from './components/pages/checkout/checkout-payment/checkout-payment.component';
import { CheckoutIdentificationComponent } from './components/pages/checkout/checkout-identification/checkout-identification.component';
import { CheckoutShippingComponent } from './components/pages/checkout/checkout-shipping/checkout-shipping.component';

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
    MainSectionTitleComponent,
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
    TeamSectionComponent,
    ModalsContainerComponent,
    InfoModalComponent,
    ErrorModalComponent,
    TermsModalComponent,
    CookiesModalComponent,
    PrivacyModalComponent,
    WarningModalComponent,
    ConfirmationModalComponent,
    NotificationModalComponent,
    CartComponent,
    OrdersComponent,
    OrderDetailsComponent,
    WishlistComponent,
    CheckoutWizardComponent,
    CheckoutComponent,
    CheckoutSummaryComponent,
    CheckoutReviewComponent,
    CheckoutPaymentComponent,
    CheckoutIdentificationComponent,
    CheckoutShippingComponent
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