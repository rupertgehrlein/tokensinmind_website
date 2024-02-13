import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LektionenNftsComponent } from './lektionen-nfts.component';

describe('LektionenNftsComponent', () => {
  let component: LektionenNftsComponent;
  let fixture: ComponentFixture<LektionenNftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LektionenNftsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LektionenNftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
