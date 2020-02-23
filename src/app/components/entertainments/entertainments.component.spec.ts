import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntertainmentsComponent } from './entertainments.component';

describe('EntertainmentsComponent', () => {
  let component: EntertainmentsComponent;
  let fixture: ComponentFixture<EntertainmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntertainmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntertainmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
