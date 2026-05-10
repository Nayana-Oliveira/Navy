import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetalhe } from './post-detalhe';

describe('PostDetalhe', () => {
  let component: PostDetalhe;
  let fixture: ComponentFixture<PostDetalhe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostDetalhe],
    }).compileComponents();

    fixture = TestBed.createComponent(PostDetalhe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
