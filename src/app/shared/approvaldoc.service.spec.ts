import { TestBed } from '@angular/core/testing';

import { ApprovaldocService } from './approvaldoc.service';

describe('ApprovaldocService', () => {
  let service: ApprovaldocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovaldocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
