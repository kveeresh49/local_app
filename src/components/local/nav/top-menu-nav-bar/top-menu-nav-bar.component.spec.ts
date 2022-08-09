import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMenuNavBarComponent } from './top-menu-nav-bar.component';

describe('TopMenuNavBarComponent', () => {
  let component: TopMenuNavBarComponent;
  let fixture: ComponentFixture<TopMenuNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopMenuNavBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopMenuNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
