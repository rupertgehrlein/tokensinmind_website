import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { proQuizGuard } from './pro-quiz.guard';

describe('proQuizGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => proQuizGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
