import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss'],
})
export class StoreDetailsComponent implements OnInit {
  @ViewChild('storeDetails', { static: true }) storeDetailsRef: ElementRef;

  constructor() {}

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      this.transformStoreDetails();
    });
  }

  transformStoreDetails(): void {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      this.storeDetailsRef.nativeElement.style.transform = 'scaleY(.55)';
    } else {
      this.storeDetailsRef.nativeElement.style.transform = 'scaleY(1)';
    }
  }
}
