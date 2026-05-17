import { TestBed } from '@angular/core/testing';

import { Letra } from './letra';

describe('Letra', () => {
  let service: Letra;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Letra);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
