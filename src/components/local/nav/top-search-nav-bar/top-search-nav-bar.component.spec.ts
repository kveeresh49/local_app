import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSearchNavBarComponent } from './top-search-nav-bar.component';

describe('TopSearchNavBarComponent', () => {
  let component: TopSearchNavBarComponent;
  let fixture: ComponentFixture<TopSearchNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopSearchNavBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopSearchNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
