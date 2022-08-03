import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersShopCategoriesComponent } from './offers-shop-categories.component';

describe('OffersShopCategoriesComponent', () => {
  let component: OffersShopCategoriesComponent;
  let fixture: ComponentFixture<OffersShopCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffersShopCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffersShopCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
