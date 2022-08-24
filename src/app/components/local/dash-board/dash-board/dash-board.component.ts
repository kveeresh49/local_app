import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss'],
})
export class DashBoardComponent implements OnInit {
 card = [
    {
      title: "Medical store",
      productImg: "../../../assets/images/shop-categories/medical.png",
      storeType: 'medical'
    },
    {
      title: "Grocery Stores",
      productImg: "../../../assets/images/shop-categories/grocery.png",
      storeType: 'grocery'
    },
    {
      title: "Liquor Stores",
      productImg: "../../../assets/images/shop-categories/liquor.png",
      storeType: 'liquor'
    },
    {
      title: "Fruits & Vegetables",
      productImg: "../../../assets/images/shop-categories/fruits-vegetables.png",
      storeType: 'vegetables'
    },
    {
      title: "From the Farms (FPO’s)",
      productImg: "../../../assets/images/shop-categories/farms.png",
      storeType: 'farms'
    },
    {
      title: "Terrace Gardens",
      productImg: "../../../assets/images/shop-categories/terrace-garden.png",
      storeType: 'garden'
    },
    {
      title: "Terrace Gardens",
      productImg: "../../../assets/images/shop-categories/terrace-garden.png",
      storeType: 'garden'
    },
    {
      title: "Fruits & Vegetables",
      productImg: "../../../assets/images/shop-categories/fruits-vegetables.png",
      storeType: 'vegetables'
    },
  ]

  nearByStoreData = [
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
  constructor() {}

  ngOnInit(): void {}
}
