import { TestBed } from '@angular/core/testing';

import { MasterkpaService } from './masterkpa.service';

describe('MasterkpaService', () => {
  let service: MasterkpaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterkpaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
