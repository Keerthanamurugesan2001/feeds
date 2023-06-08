import { TestBed } from '@angular/core/testing';

import { UserContentService } from './user-content.service';

describe('ContentService', () => {
  let service: UserContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
