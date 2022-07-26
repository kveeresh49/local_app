import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/components/auth/auth.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss'],
})
export class DashBoardComponent implements OnInit {
  menuList = [
    { menuItemName: 'Medical' },
    { menuItemName: 'Groceries' },
    { menuItemName: 'Liquor' },
    { menuItemName: 'Fruits & Vegetables' },
    { menuItemName: 'From the Farms' },
    { menuItemName: 'Terrace Gardens' },
    { menuItemName: 'Gallery' },
  ];
  public categories = [
    {
      id: 1,
      title: 'Medical Stores',
      productImg: '../../../assets/images/shop-categories/medical.png',
      storeType: 'medical',
    },
    {
      id: 2,
      title: 'Grocery Stores',
      productImg: '../../../assets/images/shop-categories/grocery.png',
      storeType: 'grocery',
    },
    {
      id: 3,
      title: 'Liquor Stores',
      productImg: '../../../assets/images/shop-categories/liquor.png',
      storeType: 'liquor',
    },
    {
      id: 4,
      title: 'Fruits & Vegetables',
      productImg:
        '../../../assets/images/shop-categories/fruits-vegetables.png',
      storeType: 'vegetables',
    },
    {
      id: 5,
      title: 'From the Farms (FPO’s)',
      productImg: '../../../assets/images/shop-categories/farms.png',
      storeType: 'farms',
    },
    {
      id: 6,
      title: 'Terrace Gardens',
      productImg: '../../../assets/images/shop-categories/terrace-garden.png',
      storeType: 'garden',
    },
    {
      id: 7,
      title: 'Terrace Gardens',
      productImg: '../../../assets/images/shop-categories/terrace-garden.png',
      storeType: 'garden',
    },
    {
      id: 8,
      title: 'Fruits & Vegetables',
      productImg:
        '../../../assets/images/shop-categories/fruits-vegetables.png',
      storeType: 'vegetables',
    },
  ];

  public nearByStoreData = [
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

  public TodayHighlights = [
    {
      id: 1,
      highlightImage: '../../../assets/images/highlights/highlight-1.png',
      storeName: 'Abhijeeth Wines',
    },
    {
      id: 2,
      highlightImage: '../../../assets/images/highlights/highlight-2.png',
      storeName: 'Bhabji Sabji',
    },
    {
      id: 3,
      highlightImage: '../../../assets/images/highlights/highlight-3.png',
      storeName: 'Meera Medical',
    },
    {
      id: 4,
      highlightImage: '../../../assets/images/highlights/highlight-2.png',
      storeName: 'Bhabji Sabji',
    },
  ];

  public CarouselImages = [
    {
      storeImage: '../../../assets/images/offers/carousel-1.png',
      storeName: 'suresh Stores',
    },
    {
      storeImage: '../../../assets/images/offers/highlight-2.png',
      storeName: 'suresh Stores',
    },
    {
      storeImage: '../../../assets/images/offers/carousel-1.png',
      storeName: 'suresh Stores',
    },
  ];

  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}
  ngOnInit(): void {
    this.authService.loginUserDetailSub$.subscribe((value) =>
      console.log(value, 'myvalue')
    );
  }
}
