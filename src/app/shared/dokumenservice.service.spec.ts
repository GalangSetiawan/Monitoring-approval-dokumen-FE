import { TestBed } from '@angular/core/testing';

import { DokumenserviceService } from './dokumenservice.service';

describe('DokumenserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DokumenserviceService = TestBed.get(DokumenserviceService);
    expect(service).toBeTruthy();
  });
});
