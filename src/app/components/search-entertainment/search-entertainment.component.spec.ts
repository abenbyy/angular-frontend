import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEntertainmentComponent } from './search-entertainment.component';

describe('SearchEntertainmentComponent', () => {
  let component: SearchEntertainmentComponent;
  let fixture: ComponentFixture<SearchEntertainmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchEntertainmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchEntertainmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
