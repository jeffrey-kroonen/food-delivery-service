import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductCategoryDetailsComponent } from './manage-product-category-details.component';

describe('ManageProductCategoryDetailsComponent', () => {
  let component: ManageProductCategoryDetailsComponent;
  let fixture: ComponentFixture<ManageProductCategoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProductCategoryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProductCategoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
