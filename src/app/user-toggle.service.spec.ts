import { TestBed } from '@angular/core/testing';

import { UserToggleService } from './user-toggle.service';

describe('UserToggleService', () => {
  let service: UserToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
