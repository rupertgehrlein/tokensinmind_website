import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UebungenHomeComponent } from './uebungen-home.component';

describe('UebungenHomeComponent', () => {
  let component: UebungenHomeComponent;
  let fixture: ComponentFixture<UebungenHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UebungenHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UebungenHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
