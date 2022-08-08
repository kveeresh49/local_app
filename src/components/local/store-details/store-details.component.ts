import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss'],
})
export class StoreDetailsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      this.changeImagDiminution();
    });
  }

  // while scrolling Img whould be shink
  changeImagDiminution() {
    if (
      document.body.scrollTop > 155 ||
      document.documentElement.scrollTop > 155
    ) {
      var header = document.getElementsByClassName('store_img_fixed')[0];
      header.classList.add('store_img_shrink');
    } else {
      var header = document.getElementsByClassName('store_img_fixed')[0];
      header.classList.remove('store_img_shrink');
    }
  }
}
