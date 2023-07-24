import { TestBed } from '@angular/core/testing';

import { GetslotsService } from './getslots.service';

describe('GetslotsService', () => {
  let service: GetslotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetslotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});