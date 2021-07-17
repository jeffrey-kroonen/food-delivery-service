import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageRestaurantComponent } from './components/manage-restaurant/manage-restaurant.component';
import { RestaurantOverviewComponent } from './components/restaurant-overview/restaurant-overview.component';
import { RestaurantProductsComponent } from './components/restaurant-products/restaurant-products.component';

const routes: Routes = [
  { path: 'restaurants/:id', component: RestaurantProductsComponent },
  { path: 'manage/restaurant', component: ManageRestaurantComponent },
  { path: '', component: RestaurantOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
