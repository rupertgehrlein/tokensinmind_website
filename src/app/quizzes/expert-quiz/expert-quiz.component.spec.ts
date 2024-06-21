import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertQuizComponent } from './expert-quiz.component';

describe('ExpertQuizComponent', () => {
  let component: ExpertQuizComponent;
  let fixture: ComponentFixture<ExpertQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertQuizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpertQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
