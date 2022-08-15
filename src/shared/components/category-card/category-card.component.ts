import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "dots": false,
    "infinite": false
  };

  // addSlide() {
  //   this.slides.push(488)
  // }

  removeSlide() {
    this.highlightCards.length = this.highlightCards.length - 1;
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

  card = [
    {
      titel: "Madical store",
      productImg: "../../../assets/images/shop-categories/medical.png",
      productType: "string",
      productBackgroundColor: "string",
      productFooterBackGround: "string"
    }
  ]

  highlightCards = [
    {
      titel:"Abhijeeth Wines",
      shopCategory:"wide variety of wines",
       varietiesInShops:"Rum, whisky, vodka",
      offerUpTo:30,
      shopImage:"../../../assets/images/highlights/highlights-image-1.png",
    },
    {
      titel:"Abhijeeth Wines",
      shopCategory:"wide variety of wines",
       varietiesInShops:"Rum, whisky, vodka",
      offerUpTo:30,
      shopImage:"../../../assets/images/highlights/highlights-image-1.png",
    },
    {
      titel:"Abhijeeth Wines",
      shopCategory:"wide variety of wines",
       varietiesInShops:"Rum, whisky, vodka",
      offerUpTo:30,
      shopImage:"../../../assets/images/highlights/highlights-image-1.png",
    },
    {
      titel:"Abhijeeth Wines",
      shopCategory:"wide variety of wines",
       varietiesInShops:"Rum, whisky, vodka",
      offerUpTo:30,
      shopImage:"../../../assets/images/highlights/highlights-image-1.png",
    },
    {
      titel:"Abhijeeth Wines",
      shopCategory:"wide variety of wines",
       varietiesInShops:"Rum, whisky, vodka",
      offerUpTo:30,
      shopImage:"../../../assets/images/highlights/highlights-image-1.png",
    }
  ]
}
