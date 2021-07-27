import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductCategory } from 'src/app/models/product-category';
import { Restaurant } from 'src/app/models/restaurant';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-manage-product-create',
  templateUrl: './manage-product-create.component.html',
  styleUrls: ['./manage-product-create.component.css']
})
export class ManageProductCreateComponent implements OnInit {

  restaurant: Restaurant = new Restaurant();
  product: Product = new Product();
  productCategories: ProductCategory[] = [];

  productImageUrl!: string;

  productCreateForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    price_per_unit: new FormControl('', [Validators.required, Validators.maxLength(6)]),
    product_category_id: new FormControl('', Validators.required),
    in_stock: new FormControl(''),
    is_active: new FormControl('')
  });

  formSubmitNotification!: string|undefined;

  constructor(private router: Router,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    // TODO: Get restaurant id from authenticated user in future.
    this.handleGetRestaurantById(1);
  }

  handleGetRestaurantById(restaurantId: number): void {
    this.restaurantService.getRestaurant(restaurantId).subscribe(data => {
      this.restaurant = data;
      this.handleGetProductCategories();
    });
  }

  handleGetProductCategories(): void {
    this.productCategoryService.getProductCategoriesByRestaurant(this.restaurant).subscribe(data => this.productCategories = data);
  }

  handleProductCreateFormSubmit(): void {
    const submittedForm = this.productCreateForm.value;

    // Map new values to current product.
    this.product.name = submittedForm.name;
    this.product.description = submittedForm.description;
    this.product.price_per_unit = submittedForm.price_per_unit;
    this.product.product_category_id = submittedForm.product_category_id;
    this.product.restaurant_id = this.restaurant.id;
    this.product.in_stock = true;
    this.product.is_active = true;

    // Update the product with the new values.
    this.productService.createProduct(this.product.id, this.product).subscribe(response => this.handleFormSubmitNotification(response));
  }

  handleFormSubmitNotification(response: HttpResponse<Product>): void {
    if (response.status == 201) {
      const productId = response.body?.id;
      this.formSubmitNotification = 'Het product is toegevoegd';

      setTimeout(() => {
        this.formSubmitNotification = undefined;
        this.router.navigate([`/manage/products/${productId}`]);
      }, 2000);
    }
  }

  onProductCategoryAdded(isCreated: boolean): void {
    if (isCreated) {
      this.handleGetProductCategories();
    }
  }

}
