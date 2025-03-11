import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { ProductDetailsComponent } from './components/pages/product-details/product-details.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { OrdersComponent } from './components/pages/orders/orders.component';
import { OrderDetailsComponent } from './components/pages/order-details/order-details.component';
import { WishlistComponent } from './components/pages/wishlist/wishlist.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'order-details/:id', component: OrderDetailsComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'checkout', component: CheckoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }