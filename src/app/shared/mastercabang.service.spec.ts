import { TestBed } from '@angular/core/testing';

import { MastercabangService } from './mastercabang.service';

describe('MastercabangService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MastercabangService = TestBed.get(MastercabangService);
    expect(service).toBeTruthy();
  });
});
