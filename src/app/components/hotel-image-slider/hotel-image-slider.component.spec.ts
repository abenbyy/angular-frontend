import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelImageSliderComponent } from './hotel-image-slider.component';

describe('HotelImageSliderComponent', () => {
  let component: HotelImageSliderComponent;
  let fixture: ComponentFixture<HotelImageSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelImageSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelImageSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
