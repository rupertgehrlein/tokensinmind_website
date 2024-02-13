import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UebungenBlockchainComponent } from './uebungen-blockchain.component';

describe('UebungenBlockchainComponent', () => {
  let component: UebungenBlockchainComponent;
  let fixture: ComponentFixture<UebungenBlockchainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UebungenBlockchainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UebungenBlockchainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
