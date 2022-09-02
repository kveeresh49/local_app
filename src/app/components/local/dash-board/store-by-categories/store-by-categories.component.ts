import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-by-categories',
  templateUrl: './store-by-categories.component.html',
  styleUrls: ['./store-by-categories.component.scss'],
})
export class StoreByCategoriesComponent implements OnInit {
  startingIndex = 0;
  endingIndex = 4;
  totalPages = 0;
  currentPage = 1;

  @Input() nearByStoreData: any;
  @Input() CategoriesType: string;
  constructor() {}

  ngOnInit(): void {}

  storeScroll(type: string) {
    if (type === 'next') {
      this.startingIndex = this.startingIndex + 4;
      this.endingIndex = this.endingIndex + 4;
      this.currentPage += 1;
    }
    if (type === 'prev') {
      this.startingIndex = this.startingIndex - 4;
      this.endingIndex = this.endingIndex - 4;
      this.currentPage -= 1;
    }
  }

  pageSize() {
    this.totalPages = Math.ceil(this.nearByStoreData.length / 4);
    return this.totalPages;
  }

  StartingPage() {
    this.currentPage = 1;
    this.startingIndex = 0;
    this.endingIndex = 4;
  }
}
