import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RestaurantOverviewComponent } from './components/restaurant-overview/restaurant-overview.component';
import { RestaurantFiltersComponent } from './components/restaurant-filters/restaurant-filters.component';
import { RestaurantProductsComponent } from './components/restaurant-products/restaurant-products.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    RestaurantOverviewComponent,
    RestaurantFiltersComponent,
    RestaurantProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
