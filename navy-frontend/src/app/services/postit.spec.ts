import { TestBed } from '@angular/core/testing';

import { PostitService } from './postit';

describe('PostitService', () => {
  let service: PostitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});