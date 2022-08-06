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

  // [
  //   {
  //     titile: "Madical store",
  //     "productImg": "string",
  //     "productType": "string",
  //     "productBackgroundColor": "string",
  //     "productFooterBackGround": "string"
  //   }
  // ]
}
