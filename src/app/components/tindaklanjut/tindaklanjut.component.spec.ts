import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TindaklanjutComponent } from './tindaklanjut.component';

describe('TindaklanjutComponent', () => {
  let component: TindaklanjutComponent;
  let fixture: ComponentFixture<TindaklanjutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TindaklanjutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TindaklanjutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
