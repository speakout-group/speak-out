import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorItemComponent } from './sponsor-item.component';

describe('SponsorItemComponent', () => {
  let component: SponsorItemComponent;
  let fixture: ComponentFixture<SponsorItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SponsorItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
