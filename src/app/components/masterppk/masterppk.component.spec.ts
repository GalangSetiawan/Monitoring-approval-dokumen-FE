import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterppkComponent } from './masterppk.component';

describe('MasterppkComponent', () => {
  let component: MasterppkComponent;
  let fixture: ComponentFixture<MasterppkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterppkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterppkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
