import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChronoTacheComponent } from './chrono-tache.component';

describe('ChronoTacheComponent', () => {
  let component: ChronoTacheComponent;
  let fixture: ComponentFixture<ChronoTacheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChronoTacheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChronoTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
