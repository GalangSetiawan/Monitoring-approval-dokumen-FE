import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabangComponent } from './cabang.component';

describe('CabangComponent', () => {
  let component: CabangComponent;
  let fixture: ComponentFixture<CabangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
