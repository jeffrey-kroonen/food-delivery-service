import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductDeleteComponent } from './manage-product-delete.component';

describe('ManageProductDeleteComponent', () => {
  let component: ManageProductDeleteComponent;
  let fixture: ComponentFixture<ManageProductDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProductDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProductDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
