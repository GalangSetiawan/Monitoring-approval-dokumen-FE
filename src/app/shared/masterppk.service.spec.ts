import { TestBed } from '@angular/core/testing';

import { MasterppkService } from './masterppk.service';

describe('MasterppkService', () => {
  let service: MasterppkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterppkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
