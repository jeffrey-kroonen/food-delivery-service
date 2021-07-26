import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageNavigationComponent } from './components/manage-navigation/manage-navigation.component';
import { ManageProductCreateComponent } from './components/manage-product-create/manage-product-create.component';
import { ManageProductDetailsComponent } from './components/manage-product-details/manage-product-details.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { ManageRestaurantComponent } from './components/manage-restaurant/manage-restaurant.component';
import { RestaurantOverviewComponent } from './components/restaurant-overview/restaurant-overview.component';
import { RestaurantProductsComponent } from './components/restaurant-products/restaurant-products.component';

const routes: Routes = [
  { path: 'restaurants/:id', component: RestaurantProductsComponent },

  // Manage
  { path: 'manage/restaurant', component: ManageRestaurantComponent },
  { path: 'manage/products/create', component: ManageProductCreateComponent },
  { path: 'manage/products/:id', component: ManageProductDetailsComponent },
  { path: 'manage/products', component: ManageProductsComponent },

  { path: '', component: RestaurantOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
