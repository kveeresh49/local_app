import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-card',
  templateUrl: './store-card.component.html',
  styleUrls: ['./store-card.component.scss'],
})
export class StoreCardComponent implements OnInit {
  getfavoriteStoreFlag = true;
  constructor() {}

  ngOnInit(): void {}

  getfavoriteStore(getfavoriteStoreFlag: boolean): void {
    this.getfavoriteStoreFlag = !getfavoriteStoreFlag;
  }


  // slides = [342, 453, 846, 855, 234, 564, 744, 243];

  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "dots": false,
    "infinite": false
  };

  popularCards = [
    {
      percentageText:15,
      shopImage: "../../../assets/images/popular-stores/store-1.png",
      shopTitel: "suresh store",
      storeCatogery:"grocery store",
      kilometers:4.5,
      rating:3.5,
      percentageImage:"../../../assets/images/popular-stores/percentage-icon.png",
      discountText:15,
      newStore:"newstore"
    },
    {
      percentageText:15,
      shopImage: "../../../assets/images/popular-stores/store-1.png",
      shopTitel: "suresh store",
      storeCatogery:"grocery store",
      kilometers:4.5,
      rating:3.5,
      percentageImage:"../../../assets/images/popular-stores/percentage-icon.png",
      discountText:15,
      newStore:"newstore"
    },
    {
      percentageText:15,
      shopImage: "../../../assets/images/popular-stores/store-1.png",
      shopTitel: "suresh store",
      storeCatogery:"grocery store",
      kilometers:4.5,
      rating:3.5,
      percentageImage:"../../../assets/images/popular-stores/percentage-icon.png",
      discountText:15,
      newStore:"newstore"
    },
    {
      percentageText:15,
      shopImage: "../../../assets/images/popular-stores/store-1.png",
      shopTitel: "suresh store",
      storeCatogery:"grocery store",
      kilometers:4.5,
      rating:3.5,
      percentageImage:"../../../assets/images/popular-stores/percentage-icon.png",
      discountText:15,
      newStore:"newstore"
    },
    {
      percentageText:15,
      shopImage: "../../../assets/images/popular-stores/store-1.png",
      shopTitel: "suresh store",
      storeCatogery:"grocery store",
      kilometers:4.5,
      rating:3.5,
      percentageImage:"../../../assets/images/popular-stores/percentage-icon.png",
      discountText:15,
      newStore:"newstore"
    }
  ];

  slides = [
    {
      percentageText:15,
      shopImage: "../../../assets/images/popular-stores/Liquor-Stores.png",
      shopTitel: "jagadamba english wine",
      storeCatogery:"grocery store",
      kilometers:4.5,
      rating:3.5,
      percentageImage:"../../../assets/images/popular-stores/percentage-icon.png",
      discountText:15,
      newStore:"newstore"
    },
    {
      percentageText:15,
      shopImage: "../../../assets/images/popular-stores/Liquor-Stores.png",
      shopTitel: "jagadamba english wine",
      storeCatogery:"grocery store",
      kilometers:4.5,
      rating:3.5,
      percentageImage:"../../../assets/images/popular-stores/percentage-icon.png",
      discountText:15,
      newStore:"newstore"
    },
    {
      percentageText:15,
      shopImage: "../../../assets/images/popular-stores/Liquor-Stores.png",
      shopTitel: "jagadamba english wine",
      storeCatogery:"grocery store",
      kilometers:4.5,
      rating:3.5,
      percentageImage:"../../../assets/images/popular-stores/percentage-icon.png",
      discountText:15,
      newStore:"newstore"
    },
    {
      percentageText:15,
      shopImage: "../../../assets/images/popular-stores/Liquor-Stores.png",
      shopTitel: "jagadamba english wine",
      storeCatogery:"grocery store",
      kilometers:4.5,
      rating:3.5,
      percentageImage:"../../../assets/images/popular-stores/percentage-icon.png",
      discountText:15,
      newStore:"newstore"
    },
    {
      percentageText:15,
      shopImage: "../../../assets/images/popular-stores/Liquor-Stores.png",
      shopTitel: "jagadamba english wine",
      storeCatogery:"grocery store",
      kilometers:4.5,
      rating:3.5,
      percentageImage:"../../../assets/images/popular-stores/percentage-icon.png",
      discountText:15,
      newStore:"newstore"
    }
  ];

  // addSlide() {
  //   this.slides.push(488)
  // }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }

}
