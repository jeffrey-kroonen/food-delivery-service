import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductCategoryQuickCreateComponent } from './manage-product-category-quick-create.component';

describe('ManageProductCategoryQuickCreateComponent', () => {
  let component: ManageProductCategoryQuickCreateComponent;
  let fixture: ComponentFixture<ManageProductCategoryQuickCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProductCategoryQuickCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProductCategoryQuickCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
