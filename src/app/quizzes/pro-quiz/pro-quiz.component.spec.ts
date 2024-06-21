import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProQuizComponent } from './pro-quiz.component';

describe('ProQuizComponent', () => {
  let component: ProQuizComponent;
  let fixture: ComponentFixture<ProQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProQuizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
