import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Restaurant } from 'src/app/models/restaurant';
import { CartService } from 'src/app/services/cart.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  restaurant!: Restaurant;
  cartTotalQuanty: number = 0;

  constructor(private cartService: CartService,
              private restaurantService: RestaurantService,
              private modalService: NgbModal,
              private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.updateTotalQuantity();
    this.getRestaurant(Number(this.router.snapshot.paramMap.get('id')));
  }

  getRestaurant(id: number) {
    this.restaurantService.getRestaurant(id).subscribe(restaurant => {
      this.restaurant = restaurant;
      
      if (this.cartService.cartItems.length > 0) {
        if (this.cartService.cartItems[0].product.restaurant_id !== this.restaurant.id) {
          this.cartService.emptyCart();
        }
      }
    });
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'cart-details'});
  }

  updateTotalQuantity(): void {
    this.cartService.totalQuantity.subscribe(totalQuantity => this.cartTotalQuanty = totalQuantity);
  }

  /**
   * Adjust styling of cart button on scroll while sticky.
   * 
   * @param any e
   */
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: any) {
    let shoppingCartButton = document.querySelector<HTMLElement>('#shopping-cart');
    let badge = shoppingCartButton?.querySelector('.badge');

    if (window.pageYOffset > 100) {
      shoppingCartButton?.classList.remove('btn-outline-dark');
      shoppingCartButton?.classList.add('btn-dark');
      badge?.classList.remove('bg-dark');
      badge?.classList.add('bg-white', 'text-dark');
    } else {
      shoppingCartButton?.classList.remove('btn-dark');
      shoppingCartButton?.classList.add('btn-outline-dark');
      badge?.classList.remove('bg-white', 'text-dark');
      badge?.classList.add('bg-dark');
    }
  }
}
