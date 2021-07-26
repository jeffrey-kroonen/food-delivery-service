import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductCategoryCreateComponent } from './manage-product-category-create.component';

describe('ManageProductCategoryCreateComponent', () => {
  let component: ManageProductCategoryCreateComponent;
  let fixture: ComponentFixture<ManageProductCategoryCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProductCategoryCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProductCategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
