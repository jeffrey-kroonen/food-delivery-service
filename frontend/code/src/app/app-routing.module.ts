import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantOverviewComponent } from './components/restaurant-overview/restaurant-overview.component';
import { RestaurantProductsComponent } from './components/restaurant-products/restaurant-products.component';

const routes: Routes = [
  { path: '', component: RestaurantOverviewComponent },
  { path: 'restaurant/:id', component: RestaurantProductsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
