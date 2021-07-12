import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { RestaurantOverviewComponent } from './components/restaurant-overview/restaurant-overview.component';
import { RestaurantProductsComponent } from './components/restaurant-products/restaurant-products.component';

const routes: Routes = [
  { path: 'restaurants/:id', component: RestaurantProductsComponent },
  { path: 'admin', component: AdminComponent },
  { path: '', component: RestaurantOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
