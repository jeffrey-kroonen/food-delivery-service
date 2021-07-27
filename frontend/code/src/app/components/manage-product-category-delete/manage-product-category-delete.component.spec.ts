import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductCategoryDeleteComponent } from './manage-product-category-delete.component';

describe('ManageProductCategoryDeleteComponent', () => {
  let component: ManageProductCategoryDeleteComponent;
  let fixture: ComponentFixture<ManageProductCategoryDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProductCategoryDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProductCategoryDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
