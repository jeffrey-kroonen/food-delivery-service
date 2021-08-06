import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAppendComponent } from './order-append.component';

describe('OrderAppendComponent', () => {
  let component: OrderAppendComponent;
  let fixture: ComponentFixture<OrderAppendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderAppendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAppendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
