import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductCategory } from 'src/app/models/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-manage-product-category-details',
  templateUrl: './manage-product-category-details.component.html',
  styleUrls: ['./manage-product-category-details.component.css']
})
export class ManageProductCategoryDetailsComponent implements OnInit {

  productCategory: ProductCategory = new ProductCategory();
  loadedProductCategory: boolean = false;

  productCategoryImageUrl!: string;

  productCategoryDetailsForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    is_active: new FormControl('')
  });

  formSubmitNotification!: string|undefined;

  constructor(private route: ActivatedRoute,
              private productCategoryService: ProductCategoryService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => this.handleGetProductCategory());
  }

  handleGetProductCategory(): void {
    const productCategoryId: number = Number(this.route.snapshot.paramMap.get('id'));

    // Fetch product category.
    this.productCategoryService.getProductCategory(productCategoryId).subscribe(
      data => {
        this.productCategory = data;
        this.loadedProductCategory = true;
        this.productCategoryDetailsForm.patchValue(this.productCategory);
        this.handleGetProductCategoryImageUrl();
      }
    );
  }

  handleGetProductCategoryImageUrl(): void {
    this.productCategoryService.getProductCategoryImageUrl(this.productCategory).subscribe(data => this.productCategoryImageUrl = data.path);
  }

  handleProductCategoryDetailsFormSubmit(): void {
    const submittedForm = this.productCategoryDetailsForm.value;

    // Map new values to current product.
    this.productCategory.name = submittedForm.name;
    this.productCategory.is_active = submittedForm.is_active;

    // Update the product with the new values.
    this.productCategoryService.updateProductCategory(this.productCategory.id, this.productCategory).subscribe(response => this.handleFormSubmitNotification(response.status));
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

    this.productCategoryService.uploadProductImage(this.productCategory, file).subscribe(data => {
      this.productCategoryImageUrl = data.path;
    });
  }
}
