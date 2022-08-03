import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-popular-stores',
  templateUrl: './popular-stores.component.html',
  styleUrls: ['./popular-stores.component.scss'],
  providers : [NgbCarouselConfig]
})
export class PopularStoresComponent implements OnInit {

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 3000;
    config.keyboard = true;
    config.pauseOnHover = true;
    // data-interval="false"
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
}

