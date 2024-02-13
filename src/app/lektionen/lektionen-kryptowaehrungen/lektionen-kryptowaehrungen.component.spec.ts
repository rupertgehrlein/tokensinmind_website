import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LektionenKryptowaehrungenComponent } from './lektionen-kryptowaehrungen.component';

describe('LektionenKryptowaehrungenComponent', () => {
  let component: LektionenKryptowaehrungenComponent;
  let fixture: ComponentFixture<LektionenKryptowaehrungenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LektionenKryptowaehrungenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LektionenKryptowaehrungenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
