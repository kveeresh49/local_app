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


  card = [
    {
      titel: "Madical store",
      productImg: "../../../assets/images/shop-categories/medical.png",
      productType: "string",
      productBackgroundColor: "string",
      productFooterBackGround: "string"
    }
  ]

  highlightCard = [
    {
      titel:"Abhijeeth Wines",
      varietiesInShops:"",
      varietiesInShopsTitel:"",
      DiscountInShops:"",
      highlightBackgroundColor:"",
    }
  ]
}
