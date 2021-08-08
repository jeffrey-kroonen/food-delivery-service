import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductCategory } from 'src/app/models/product-category';
import { Restaurant } from 'src/app/models/restaurant';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-manage-product-details',
  templateUrl: './manage-product-details.component.html',
  styleUrls: ['./manage-product-details.component.css']
})
export class ManageProductDetailsComponent implements OnInit {

  restaurant: Restaurant = new Restaurant();
  product: Product = new Product();
  loadedProduct = false;
  productCategories: ProductCategory[] = [];

  productImageUrl!: string;

  productDetailsForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    price_per_unit: new FormControl('', [Validators.required, Validators.maxLength(6)]),
    product_category_id: new FormControl('', Validators.required),
    in_stock: new FormControl(''),
    is_active: new FormControl('')
  });

  formSubmitNotification!: string|undefined;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private productCategoryService: ProductCategoryService,
              private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => this.handleGetProduct());
  }

  handleGetProduct(): void {
    const productId: number = Number(this.route.snapshot.paramMap.get('id'));

    // Fetch product.
    this.productService.getProduct(productId).subscribe(
      data => {
        this.product = data;
        this.loadedProduct = true;
        this.productDetailsForm.patchValue(this.product);
        this.handleGetProductImageUrl();
        this.handleGetRestaurantById(this.product.restaurant_id);
      });
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

  handleGetProductImageUrl(): void {
    this.productService.getProductImageUrl(this.product).subscribe(data => this.productImageUrl = data.path);
  }

  handleProductDetailsFormSubmit(): void {
    const submittedForm = this.productDetailsForm.value;

    // Map new values to current product.
    this.product.name = submittedForm.name;
    this.product.description = submittedForm.description;
    this.product.price_per_unit = submittedForm.price_per_unit;
    this.product.product_category_id = submittedForm.product_category_id;
    this.product.in_stock = submittedForm.in_stock === 1 ? true : submittedForm.in_stock;
    this.product.is_active = submittedForm.is_active === 1 ? true : submittedForm.is_active;

    // Update the product with the new values.
    this.productService.updateProduct(this.product.id, this.product).subscribe(response => this.handleFormSubmitNotification(response.status));
  }

  handleFormSubmitNotification(statusCode: number): void {
    if (statusCode == 200) {
      this.formSubmitNotification = 'De velden zijn bijgewerkt.';

      setTimeout(() => {
        this.formSubmitNotification = undefined;
      }, 2000);
    }
  }

  handleFileInput(event: Event): void {
    // Get file as object.
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    this.productService.uploadProductImage(this.product, file).subscribe(data => {
      this.productImageUrl = data.path;
    });
  }

  onProductCategoryAdded(isCreated: boolean): void {
    if (isCreated) {
      this.handleGetProductCategories();
    }
  }

}
