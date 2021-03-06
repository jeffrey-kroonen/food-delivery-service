import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductCategory } from 'src/app/models/product-category';
import { Restaurant } from 'src/app/models/restaurant';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-manage-product-category-create',
  templateUrl: './manage-product-category-create.component.html',
  styleUrls: ['./manage-product-category-create.component.css']
})
export class ManageProductCategoryCreateComponent implements OnInit {

  productCategory: ProductCategory = new ProductCategory();
  restaurant: Restaurant = new Restaurant();

  productCategoryCreateForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  formSubmitNotification!: string|undefined;

  constructor(private productCategoryService: ProductCategoryService,
              private restaurantService: RestaurantService,
              private modalService: NgbModal,
              private router: Router) { }

  ngOnInit(): void {
    // TODO: Get restaurant id from authenticated user in future.
    this.handleGetRestaurantById(1);
  }

  handleGetRestaurantById(restaurantId: number): void {
    this.restaurantService.getRestaurant(restaurantId).subscribe(data => this.restaurant = data);
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
      this.modalService.dismissAll();
      this.handleFormSubmitNotification(response);
    } 
  }

  handleFormSubmitNotification(response: HttpResponse<ProductCategory>): void {
    if (response.status == 201) {
      const productCategoryId = response.body?.id;
      this.formSubmitNotification = 'De productcategorie is toegevoegd';

      setTimeout(() => {
        this.formSubmitNotification = undefined;
        this.router.navigate([`/manage/product-categories/${productCategoryId}`]);
      }, 2000);
    }
  }
}
