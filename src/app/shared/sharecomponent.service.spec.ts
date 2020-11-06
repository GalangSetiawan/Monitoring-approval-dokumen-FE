import { TestBed } from '@angular/core/testing';

import { SharecomponentService } from './sharecomponent.service';

describe('SharecomponentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharecomponentService = TestBed.get(SharecomponentService);
    expect(service).toBeTruthy();
  });
});
