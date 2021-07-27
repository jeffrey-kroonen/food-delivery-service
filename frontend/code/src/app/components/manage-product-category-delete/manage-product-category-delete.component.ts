import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, Subject } from 'rxjs';
import { ProductCategory } from 'src/app/models/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-manage-product-category-delete',
  templateUrl: './manage-product-category-delete.component.html',
  styleUrls: ['./manage-product-category-delete.component.css']
})
export class ManageProductCategoryDeleteComponent implements OnInit {

  @Input() productCategory: ProductCategory = new ProductCategory();

  attachedProductDeleted: Subject<boolean> = new Subject<boolean>();
  
  constructor(private router: Router,
              private modalService: NgbModal,
              private productCategoryService: ProductCategoryService,
              private productService: ProductService) { }

  ngOnInit(): void {
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'product-category-details-delete'});
  }

  deleteSequal(): void {
    this.deleteProducts();
    this.deleteProductCategory();
  }

  private deleteProducts(): void {
    // Delete products attached to the product category.
    this.productService.getProductsByProductCategory(this.productCategory).subscribe(products => {
      if (products.length > 0) {
        for (let product of products) {
          this.productService.deleteProduct(product).subscribe((data) => {});
        }
      }

      this.attachedProductDeleted.next(true);
    });
  }

  private deleteProductCategory(): void {
    this.attachedProductDeleted.subscribe(areDeleted => {
      if (areDeleted == true) {
        // Delete product category.
        this.productCategoryService.deleteProductCategory(this.productCategory).subscribe(
          response => {
            if (response.status == 200) {
              this.modalService.dismissAll();
              this.router.navigate(['/manage/product-categories']);
              this.attachedProductDeleted.next(false);
            }
            // TODO: Show error message.
          }
        );
      }
    })
  }

}
