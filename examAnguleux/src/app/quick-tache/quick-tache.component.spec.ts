import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickTacheComponent } from './quick-tache.component';

describe('QuickTacheComponent', () => {
  let component: QuickTacheComponent;
  let fixture: ComponentFixture<QuickTacheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickTacheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
