import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemuaninspektoratComponent } from './temuaninspektorat.component';

describe('TemuaninspektoratComponent', () => {
  let component: TemuaninspektoratComponent;
  let fixture: ComponentFixture<TemuaninspektoratComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemuaninspektoratComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemuaninspektoratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
