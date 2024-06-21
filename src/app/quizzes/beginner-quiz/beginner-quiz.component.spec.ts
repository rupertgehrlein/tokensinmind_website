import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginnerQuizComponent } from './beginner-quiz.component';

describe('BeginnerQuizComponent', () => {
  let component: BeginnerQuizComponent;
  let fixture: ComponentFixture<BeginnerQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeginnerQuizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BeginnerQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
