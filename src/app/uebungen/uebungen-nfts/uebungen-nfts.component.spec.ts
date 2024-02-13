import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UebungenNftsComponent } from './uebungen-nfts.component';

describe('UebungenNftsComponent', () => {
  let component: UebungenNftsComponent;
  let fixture: ComponentFixture<UebungenNftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UebungenNftsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UebungenNftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
