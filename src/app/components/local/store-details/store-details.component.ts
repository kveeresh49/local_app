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
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      var header = document.getElementsByClassName('store_img_fixed')[0];
      header.classList.add('store_img_shrink');
      var store1Image = document.getElementsByClassName('store-1_img_resolution')[0];
      store1Image.classList.add('img-after-shrink');
      var descriptionCard = document.getElementsByClassName('store_description_card')[0];
      descriptionCard.classList.add('img-after-shrink');
      var backArrow = document.getElementsByClassName('back-arrow_alignment')[0];
      backArrow.classList.add('back-arrow_alignment-after-shrink');
    } else {
      var header = document.getElementsByClassName('store_img_fixed')[0];
      header.classList.remove('store_img_shrink');
      var store1Image = document.getElementsByClassName('store-1_img_resolution')[0];
      store1Image.classList.remove('img-after-shrink');
      var descriptionCard = document.getElementsByClassName('store_description_card')[0];
      descriptionCard.classList.remove('img-after-shrink');
      var backArrow = document.getElementsByClassName('back-arrow_alignment')[0];
      backArrow.classList.remove('back-arrow_alignment-after-shrink');
    }
  }
}
