import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductCategory } from 'src/app/models/product-category';
import { Restaurant } from 'src/app/models/restaurant';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-manage-product-category-quick-create',
  templateUrl: './manage-product-category-quick-create.component.html',
  styleUrls: ['./manage-product-category-quick-create.component.css']
})
export class ManageProductCategoryQuickCreateComponent implements OnInit {

  productCategory: ProductCategory = new ProductCategory();

  @Input() restaurant: Restaurant = new Restaurant();

  @Output() productCategoryAdded: EventEmitter<boolean> = new EventEmitter<boolean>();

  productCategoryCreateForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(private productCategoryService: ProductCategoryService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content: any): void {
    this.modalService.open(content, {ariaLabelledBy: 'product-details-delete'});
  }

  handleCreateProductCategoryForm(): void {
    const submittedForm = this.productCategoryCreateForm.value;
    this.productCategory.restaurant_id = this.restaurant.id;
    this.productCategory.name = submittedForm.name;
    this.productCategory.is_active = true;

    this.productCategoryService.createProductCategory(this.productCategory).subscribe(response => this.handleSubmitNotification(response));
  }

  handleSubmitNotification(response: HttpResponse<ProductCategory>): void {
    if (response.status == 201) {
      this.handleEmitProductCategoryAdded();
      this.modalService.dismissAll();
      this.productCategoryCreateForm.reset();
      
    } 
  }

  handleEmitProductCategoryAdded(): void {
    this.productCategoryAdded.emit(true);
  }

}
