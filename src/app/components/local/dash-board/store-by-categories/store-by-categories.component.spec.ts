import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreByCategoriesComponent } from './store-by-categories.component';

describe('StoreByCategoriesComponent', () => {
  let component: StoreByCategoriesComponent;
  let fixture: ComponentFixture<StoreByCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreByCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreByCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
