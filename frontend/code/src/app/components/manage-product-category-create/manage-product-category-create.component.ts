import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductCategory } from 'src/app/models/product-category';
import { Restaurant } from 'src/app/models/restaurant';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-manage-product-category-create',
  templateUrl: './manage-product-category-create.component.html',
  styleUrls: ['./manage-product-category-create.component.css']
})
export class ManageProductCategoryCreateComponent implements OnInit {

  productCategory: ProductCategory = new ProductCategory();

  @Input() restaurant: Restaurant = new Restaurant();

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

    // TODO: Post product category to backend.
    this.productCategoryService.createProductCategory(this.productCategory).subscribe(data => console.log(data));
  }
}
