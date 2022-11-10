import { TestBed } from '@angular/core/testing';

import { PreloadNotesGuard } from './preload-notes.guard';

describe('PreloadNotesGuard', () => {
  let guard: PreloadNotesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreloadNotesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
