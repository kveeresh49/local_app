import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-near-by-stores',
  templateUrl: './near-by-stores.component.html',
  styleUrls: ['./near-by-stores.component.scss']
})
export class NearByStoresComponent implements OnInit {
  startingIndex = 0;
  endingIndex = 4;
  totalPages = 0;
  currentPage = 1;

  @Input() nearByStoreData :any;
  constructor() { }

  ngOnInit(): void {
  }

  storeScroll(type:string) {
    if (type === "next") {
      this.startingIndex = this.startingIndex + 4;
      this.endingIndex = this.endingIndex + 4;
      this.currentPage += 1;
    }
    if (type === "prev") {
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
