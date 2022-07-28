import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaclNavbarComponent } from './loacl-navbar.component';

describe('LoaclNavbarComponent', () => {
  let component: LoaclNavbarComponent;
  let fixture: ComponentFixture<LoaclNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaclNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaclNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
