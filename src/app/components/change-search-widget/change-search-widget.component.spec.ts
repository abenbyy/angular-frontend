import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSearchWidgetComponent } from './change-search-widget.component';

describe('ChangeSearchWidgetComponent', () => {
  let component: ChangeSearchWidgetComponent;
  let fixture: ComponentFixture<ChangeSearchWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeSearchWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeSearchWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
