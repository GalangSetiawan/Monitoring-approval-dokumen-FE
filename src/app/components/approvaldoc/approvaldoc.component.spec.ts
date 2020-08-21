import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovaldocComponent } from './approvaldoc.component';

describe('ApprovaldocComponent', () => {
  let component: ApprovaldocComponent;
  let fixture: ComponentFixture<ApprovaldocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovaldocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovaldocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
