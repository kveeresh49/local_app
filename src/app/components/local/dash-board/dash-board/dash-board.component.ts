import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss'],
})
export class DashBoardComponent implements OnInit {
  card = [
    {
      storeType: 'medical',
      productImg: '../../../assets/images/shop-categories/medical.png',
      title: 'Medical store',
    },
    {
      storeType: 'medical',
      productImg: '../../../assets/images/shop-categories/medical.png',
      title: 'Medical store',
    },
    {
      storeType: 'medical',
      productImg: '../../../assets/images/shop-categories/medical.png',
      title: 'Medical store',
    },
    {
      storeType: 'medical',
      productImg: '../../../assets/images/shop-categories/medical.png',
      title: 'Medical store',
    },
    {
      storeType: 'medical',
      productImg: '../../../assets/images/shop-categories/medical.png',
      title: 'Medical store',
    },
    {
      storeType: 'medical',
      productImg: '../../../assets/images/shop-categories/medical.png',
      title: 'Medical store',
    },
    {
      storeType: 'medical',
      productImg: '../../../assets/images/shop-categories/medical.png',
      title: 'Medical store',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
