import { TestBed } from '@angular/core/testing';

import { TindaklanjutService } from './tindaklanjut.service';

describe('TindaklanjutService', () => {
  let service: TindaklanjutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TindaklanjutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
