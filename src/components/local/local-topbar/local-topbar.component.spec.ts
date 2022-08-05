import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalTopbarComponent } from './local-topbar.component';

describe('LocalTopbarComponent', () => {
  let component: LocalTopbarComponent;
  let fixture: ComponentFixture<LocalTopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalTopbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
