import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tidaklanjutv2Component } from './tidaklanjutv2.component';

describe('Tidaklanjutv2Component', () => {
  let component: Tidaklanjutv2Component;
  let fixture: ComponentFixture<Tidaklanjutv2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tidaklanjutv2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tidaklanjutv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
