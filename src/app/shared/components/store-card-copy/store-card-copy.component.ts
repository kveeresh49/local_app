import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-card-copy',
  templateUrl: './store-card-copy.component.html',
  styleUrls: ['./store-card-copy.component.scss'],
})
export class StoreCardComponentCopy implements OnInit {
  getfavoriteStoreFlag = true;
  psStartIndex = 0;
  psEndIndex = 4;
  psTotalPages = 0;
  psCurrentPage = 1;
  nsStartIndex = 0;
  nsEndIndex = 4;
  nsTotalPages = 0;
  nsCurrentPage = 1;
  constructor(private router:Router) {}

  ngOnInit(): void {
    
  }

  getfavoriteStore(getfavoriteStoreFlag: boolean): void {
    this.getfavoriteStoreFlag = !getfavoriteStoreFlag;
  }

  // slides = [342, 453, 846, 855, 234, 564, 744, 243];

  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    infinite: false,
  };

  popularCards = [
    {
      percentageText: 15,
      shopImage: '../../../assets/images/popular-stores/stock-box-1.png',
      shopTitel: 'suresh store',
      storeCatogery: 'grocery store',
      kilometers: 4.5,
      rating: 3.5,
      percentageImage:
        '../../../assets/images/popular-stores/percentage-icon.png',
      discountText: 15,
      newStore: 'newstore',
    },
    {
      percentageText: 15,
      shopImage: '../../../assets/images/popular-stores/stock-box-2.png',
      shopTitel: 'suresh store',
      storeCatogery: 'grocery store',
      kilometers: 4.5,
      rating: 3.5,
      percentageImage:
        '../../../assets/images/popular-stores/percentage-icon.png',
      discountText: 15,
      newStore: 'newstore',
    },
    {
      percentageText: 15,
      shopImage: '../../../assets/images/popular-stores/stock-box-4.png',
      shopTitel: 'suresh store',
      storeCatogery: 'grocery store',
      kilometers: 4.5,
      rating: 3.5,
      percentageImage:
        '../../../assets/images/popular-stores/percentage-icon.png',
      discountText: 15,
      newStore: 'newstore',
    },
    {
      percentageText: 15,
      shopImage: '../../../assets/images/popular-stores/stock-box-2.png',
      shopTitel: 'suresh store',
      storeCatogery: 'grocery store',
      kilometers: 4.5,
      rating: 3.5,
      percentageImage:
        '../../../assets/images/popular-stores/percentage-icon.png',
      discountText: 15,
      newStore: 'newstore',
    },
    {
      percentageText: 15,
      shopImage: '../../../assets/images/popular-stores/stock-box-2.png',
      shopTitel: 'suresh store',
      storeCatogery: 'grocery store',
      kilometers: 4.5,
      rating: 3.5,
      percentageImage:
        '../../../assets/images/popular-stores/percentage-icon.png',
      discountText: 15,
      newStore: 'newstore',
    },
  ];

  slides = [
    {
      percentageText: 15,
      shopImage: '../../../assets/images/popular-stores/stock-box-1.png',
      shopTitel: 'jagadamba english wine',
      storeCatogery: 'grocery store',
      kilometers: 4.5,
      rating: 3.5,
      percentageImage:
        '../../../assets/images/popular-stores/percentage-icon.png',
      discountText: 15,
      newStore: 'newstore',
    },
    {
      percentageText: 15,
      shopImage: '../../../assets/images/popular-stores/stock-box-1.png',
      shopTitel: 'jagadamba english wine',
      storeCatogery: 'grocery store',
      kilometers: 4.5,
      rating: 3.5,
      percentageImage:
        '../../../assets/images/popular-stores/percentage-icon.png',
      discountText: 15,
      newStore: 'newstore',
    },
    {
      percentageText: 15,
      shopImage: '../../../assets/images/popular-stores/stock-box-1.png',
      shopTitel: 'jagadamba english wine',
      storeCatogery: 'grocery store',
      kilometers: 4.5,
      rating: 3.5,
      percentageImage:
        '../../../assets/images/popular-stores/percentage-icon.png',
      discountText: 15,
      newStore: 'newstore',
    },
    {
      percentageText: 15,
      shopImage: '../../../assets/images/popular-stores/Liquor-Stores.png',
      shopTitel: 'jagadamba english wine',
      storeCatogery: 'grocery store',
      kilometers: 4.5,
      rating: 3.5,
      percentageImage:
        '../../../assets/images/popular-stores/percentage-icon.png',
      discountText: 15,
      newStore: 'newstore',
    },
    {
      percentageText: 15,
      shopImage: '../../../assets/images/popular-stores/Liquor-Stores.png',
      shopTitel: 'jagadamba english wine',
      storeCatogery: 'grocery store',
      kilometers: 4.5,
      rating: 3.5,
      percentageImage:
        '../../../assets/images/popular-stores/percentage-icon.png',
      discountText: 15,
      newStore: 'newstore',
    },
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

  scrollStores(store: any, type: string) {
    if (store === 'popularStore') {
      if (type === 'next') {
        this.psStartIndex = this.psStartIndex + 4;
        this.psEndIndex = this.psEndIndex + 4;
        this.psCurrentPage += 1;
      }
      if (type === 'prev') {
        this.psStartIndex = this.psStartIndex - 4;
        this.psEndIndex = this.psEndIndex - 4;
        this.psCurrentPage -= 1;
      }
    }
    if (store === 'nearByStore') {
      if (type === 'next') {
        this.nsStartIndex = this.nsStartIndex + 4;
        this.nsEndIndex = this.nsEndIndex + 4;
        this.nsCurrentPage += 1;
      }
      if (type === 'prev') {
        this.nsStartIndex = this.nsStartIndex - 4;
        this.nsEndIndex = this.nsEndIndex - 4;
        this.nsCurrentPage -= 1;
      }
    }
  }

  pageSize(store:any) {
    if(store === 'popularStore') {
      this.psTotalPages = Math.ceil(this.popularCards.length / 4);
      return this.psTotalPages;
    }
    else {
      return Math.ceil(this.slides.length / 4)
    }
  }
  
  StartingPage(store:any) {
    if (store === 'popularStore') {
      this.psCurrentPage = 1;
      this.psStartIndex = 0;
      this.psEndIndex = 4;
    }
    if (store === 'nearByStore') {
      this.nsCurrentPage = 1;
      this.nsStartIndex = 0;
      this.nsEndIndex = 4;
    }
  }

  navigateStore() {
    this.router.navigate(['/store']);
  }
}
