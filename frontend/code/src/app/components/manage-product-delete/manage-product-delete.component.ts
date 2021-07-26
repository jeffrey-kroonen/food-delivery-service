import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-manage-product-delete',
  templateUrl: './manage-product-delete.component.html',
  styleUrls: ['./manage-product-delete.component.css']
})
export class ManageProductDeleteComponent implements OnInit {

  @Input() product: Product = new Product();

  constructor(private router: Router,
              private modalService: NgbModal,
              private productService: ProductService) { }

  ngOnInit(): void {
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'product-details-delete'});
  }

  deleteProduct(): void {
    this.productService.deleteProduct(this.product).subscribe(
      response => {
        if (response.status == 200) {
          this.modalService.dismissAll();
          this.router.navigate(['/manage/products']);
        }
        // TODO: Show error message.
      }
    );
  }

}
