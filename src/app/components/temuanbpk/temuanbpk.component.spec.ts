import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemuanbpkComponent } from './temuanbpk.component';

describe('TemuanbpkComponent', () => {
  let component: TemuanbpkComponent;
  let fixture: ComponentFixture<TemuanbpkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemuanbpkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemuanbpkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
