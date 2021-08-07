import { Component, HostListener, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartTotalQuanty: number = 0;

  constructor(private cartService: CartService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.updateTotalQuantity();
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
