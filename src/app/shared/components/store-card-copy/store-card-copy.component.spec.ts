import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCardComponentCopy } from './store-card-copy.component';

describe('StoreCardComponentCopy', () => {
  let component: StoreCardComponentCopy;
  let fixture: ComponentFixture<StoreCardComponentCopy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreCardComponentCopy ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreCardComponentCopy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
