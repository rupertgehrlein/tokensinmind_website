import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadsHomeComponent } from './downloads-home.component';

describe('DownloadsHomeComponent', () => {
  let component: DownloadsHomeComponent;
  let fixture: ComponentFixture<DownloadsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadsHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DownloadsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
