import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ManageProductCategoriesComponent } from './components/manage-product-categories/manage-product-categories.component';
import { ManageProductCategoryCreateComponent } from './components/manage-product-category-create/manage-product-category-create.component';
import { ManageProductCategoryDetailsComponent } from './components/manage-product-category-details/manage-product-category-details.component';
import { ManageProductCreateComponent } from './components/manage-product-create/manage-product-create.component';
import { ManageProductDetailsComponent } from './components/manage-product-details/manage-product-details.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { ManageRestaurantComponent } from './components/manage-restaurant/manage-restaurant.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { RestaurantOverviewComponent } from './components/restaurant-overview/restaurant-overview.component';
import { RestaurantProductsComponent } from './components/restaurant-products/restaurant-products.component';

const routes: Routes = [
  { path: 'restaurants/:id', component: RestaurantProductsComponent },

  // Manage
  { path: 'manage/restaurant', component: ManageRestaurantComponent },
  { path: 'manage/products/create', component: ManageProductCreateComponent },
  { path: 'manage/products/:id', component: ManageProductDetailsComponent },
  { path: 'manage/products', component: ManageProductsComponent },
  { path: 'manage/product-categories/create', component: ManageProductCategoryCreateComponent },
  { path: 'manage/product-categories/:id', component: ManageProductCategoryDetailsComponent },
  { path: 'manage/product-categories', component: ManageProductCategoriesComponent },

  // Checkout
  { path: 'checkout', component: CheckoutComponent },

  // Order
  { path: 'order-details/:id', component: OrderDetailsComponent },

  { path: '', component: RestaurantOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
