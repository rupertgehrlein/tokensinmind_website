import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { beginnerQuizGuard } from './beginner-quiz.guard';

describe('beginnerQuizGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => beginnerQuizGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
