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
}
