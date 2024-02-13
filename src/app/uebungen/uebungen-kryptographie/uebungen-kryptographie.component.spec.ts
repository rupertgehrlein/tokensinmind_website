import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UebungenKryptographieComponent } from './uebungen-kryptographie.component';

describe('UebungenKryptographieComponent', () => {
  let component: UebungenKryptographieComponent;
  let fixture: ComponentFixture<UebungenKryptographieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UebungenKryptographieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UebungenKryptographieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
