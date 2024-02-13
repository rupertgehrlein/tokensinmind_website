import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LektionenKryptographieComponent } from './lektionen-kryptographie.component';

describe('LektionenKryptographieComponent', () => {
  let component: LektionenKryptographieComponent;
  let fixture: ComponentFixture<LektionenKryptographieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LektionenKryptographieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LektionenKryptographieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
