import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LektionenHomeComponent } from './lektionen-home.component';

describe('LektionenHomeComponent', () => {
  let component: LektionenHomeComponent;
  let fixture: ComponentFixture<LektionenHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LektionenHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LektionenHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
