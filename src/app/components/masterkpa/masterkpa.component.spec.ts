import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterkpaComponent } from './masterkpa.component';

describe('MasterkpaComponent', () => {
  let component: MasterkpaComponent;
  let fixture: ComponentFixture<MasterkpaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterkpaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterkpaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
