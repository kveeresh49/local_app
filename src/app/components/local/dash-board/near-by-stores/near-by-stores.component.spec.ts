import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearByStoresComponent } from './near-by-stores.component';

describe('NearByStoresComponent', () => {
  let component: NearByStoresComponent;
  let fixture: ComponentFixture<NearByStoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NearByStoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NearByStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
