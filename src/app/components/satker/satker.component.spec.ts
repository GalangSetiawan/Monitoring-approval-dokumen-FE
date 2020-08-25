import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SatkerComponent } from './satker.component';

describe('SatkerComponent', () => {
  let component: SatkerComponent;
  let fixture: ComponentFixture<SatkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SatkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SatkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
