import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent implements OnInit {

  card  = {storeType: "medical" , productImg : "../../../assets/images/shop-categories/medical.png", title:"Medical store"}
  card1  = {storeType: "liquor" , productImg : "../../../assets/images/shop-categories/liquor.png", title:"Liquor Stores"}
  constructor() { }

  ngOnInit(): void {
  }

}
