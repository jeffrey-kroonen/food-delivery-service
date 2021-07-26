import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductDetailsComponent } from './manage-product-details.component';

describe('ManageProductDetailsComponent', () => {
  let component: ManageProductDetailsComponent;
  let fixture: ComponentFixture<ManageProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProductDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
