import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LektionenBlockchainComponent } from './lektionen-blockchain.component';

describe('LektionenBlockchainComponent', () => {
  let component: LektionenBlockchainComponent;
  let fixture: ComponentFixture<LektionenBlockchainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LektionenBlockchainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LektionenBlockchainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
