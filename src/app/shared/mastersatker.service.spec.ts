import { TestBed } from '@angular/core/testing';

import { MastersatkerService } from './mastersatker.service';

describe('MastersatkerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MastersatkerService = TestBed.get(MastersatkerService);
    expect(service).toBeTruthy();
  });
});
