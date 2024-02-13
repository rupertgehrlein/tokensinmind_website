import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UebungenKryptowaehrungenComponent } from './uebungen-kryptowaehrungen.component';

describe('UebungenKryptowaehrungenComponent', () => {
  let component: UebungenKryptowaehrungenComponent;
  let fixture: ComponentFixture<UebungenKryptowaehrungenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UebungenKryptowaehrungenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UebungenKryptowaehrungenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
