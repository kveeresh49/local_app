import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginImgComponent } from './login-img.component';

describe('LoginImgComponent', () => {
  let component: LoginImgComponent;
  let fixture: ComponentFixture<LoginImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
