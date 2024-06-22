import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { expertQuizGuard } from './expert-quiz.guard';

describe('expertQuizGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => expertQuizGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
