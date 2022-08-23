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

  nearByStoreData = [];
  constructor() {}

  ngOnInit(): void {}
}
