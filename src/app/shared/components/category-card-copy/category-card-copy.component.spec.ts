import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCardComponentCopy } from './category-card-copy.component';

describe('CategoryCardComponentCopy', () => {
  let component: CategoryCardComponentCopy;
  let fixture: ComponentFixture<CategoryCardComponentCopy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryCardComponentCopy ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryCardComponentCopy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
