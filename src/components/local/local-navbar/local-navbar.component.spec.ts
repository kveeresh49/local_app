import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalNavbarComponent } from './local-navbar.component';

describe('LocalNavbarComponent', () => {
  let component: LocalNavbarComponent;
  let fixture: ComponentFixture<LocalNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
