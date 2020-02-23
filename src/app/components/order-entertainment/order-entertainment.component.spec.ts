import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderEntertainmentComponent } from './order-entertainment.component';

describe('OrderEntertainmentComponent', () => {
  let component: OrderEntertainmentComponent;
  let fixture: ComponentFixture<OrderEntertainmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderEntertainmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderEntertainmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
