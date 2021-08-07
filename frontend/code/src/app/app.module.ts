import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RestaurantOverviewComponent } from './components/restaurant-overview/restaurant-overview.component';
import { RestaurantFiltersComponent } from './components/restaurant-filters/restaurant-filters.component';
import { RestaurantProductsComponent } from './components/restaurant-products/restaurant-products.component';
import { LocationComponent } from './components/location/location.component';
import { AdminComponent } from './components/admin/admin.component';
import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { ManageRestaurantComponent } from './components/manage-restaurant/manage-restaurant.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { ManageNavigationComponent } from './components/manage-navigation/manage-navigation.component';
import { ManageProductDetailsComponent } from './components/manage-product-details/manage-product-details.component';
import { ManageProductCreateComponent } from './components/manage-product-create/manage-product-create.component';
import { ManageProductDeleteComponent } from './components/manage-product-delete/manage-product-delete.component';
import { ManageProductCategoryCreateComponent } from './components/manage-product-category-create/manage-product-category-create.component';
import { ManageProductCategoriesComponent } from './components/manage-product-categories/manage-product-categories.component';
import { ManageProductCategoryQuickCreateComponent } from './components/manage-product-category-quick-create/manage-product-category-quick-create.component';
import { ManageProductCategoryDetailsComponent } from './components/manage-product-category-details/manage-product-category-details.component';
import { ManageProductCategoryDeleteComponent } from './components/manage-product-category-delete/manage-product-category-delete.component';
import { CartComponent } from './components/cart/cart.component';
import { CartAppendComponent } from './components/cart-append/cart-append.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';

registerLocaleData(localeNl, 'nl');

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    RestaurantOverviewComponent,
    RestaurantFiltersComponent,
    RestaurantProductsComponent,
    LocationComponent,
    AdminComponent,
    ManageRestaurantComponent,
    ManageProductsComponent,
    ManageNavigationComponent,
    ManageProductDetailsComponent,
    ManageProductCreateComponent,
    ManageProductDeleteComponent,
    ManageProductCategoryCreateComponent,
    ManageProductCategoriesComponent,
    ManageProductCategoryQuickCreateComponent,
    ManageProductCategoryDetailsComponent,
    ManageProductCategoryDeleteComponent,
    CartComponent,
    CartAppendComponent,
    CartDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
