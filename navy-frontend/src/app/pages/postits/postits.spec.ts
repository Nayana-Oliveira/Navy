import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Postits } from './postits';

describe('Postits', () => {
  let component: Postits;
  let fixture: ComponentFixture<Postits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Postits],
    }).compileComponents();

    fixture = TestBed.createComponent(Postits);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
