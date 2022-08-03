import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-offers-shop-categories',
  templateUrl: './offers-shop-categories.component.html',
  styleUrls: ['./offers-shop-categories.component.scss'],
  providers: [NgbCarouselConfig]
})
export class OffersShopCategoriesComponent implements OnInit {




  // images = [700, 800, 807].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
    // data-interval="false"
  }

  ngOnInit(): void {
  }

}
