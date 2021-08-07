import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartAppendComponent } from './cart-append.component';

describe('CartAppendComponent', () => {
  let component: CartAppendComponent;
  let fixture: ComponentFixture<CartAppendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartAppendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartAppendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
