import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandinglogoComponent } from './landinglogo.component';

describe('LandinglogoComponent', () => {
  let component: LandinglogoComponent;
  let fixture: ComponentFixture<LandinglogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandinglogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandinglogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
