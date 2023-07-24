import { TestBed } from '@angular/core/testing';

import { BookslotService } from './bookslot.service';

describe('BookslotService', () => {
  let service: BookslotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookslotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});