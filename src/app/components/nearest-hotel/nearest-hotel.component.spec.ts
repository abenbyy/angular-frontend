import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearestHotelComponent } from './nearest-hotel.component';

describe('NearestHotelComponent', () => {
  let component: NearestHotelComponent;
  let fixture: ComponentFixture<NearestHotelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearestHotelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearestHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
