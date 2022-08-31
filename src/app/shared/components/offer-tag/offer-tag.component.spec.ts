import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferTagComponent } from './offer-tag.component';

describe('OfferTagComponent', () => {
  let component: OfferTagComponent;
  let fixture: ComponentFixture<OfferTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferTagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
