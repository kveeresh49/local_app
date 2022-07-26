import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories-type.component.html',
  styleUrls: ['./categories-type.component.scss'],
})
export class CategoriesTypeComponent implements OnInit {
  startingIndex = 0;
  endingIndex = 6;
  totalPages = 0;
  currentPage = 1;

  @Input() categories: any = [];

  constructor() {}

  ngOnInit(): void {}

  storeScroll(type: string) {
    if (type === 'next') {
      this.startingIndex = this.startingIndex + 6;
      this.endingIndex = this.endingIndex + 6;
      this.currentPage += 1;
    }
    if (type === 'prev') {
      this.startingIndex = this.startingIndex - 6;
      this.endingIndex = this.endingIndex - 6;
      this.currentPage -= 1;
    }
  }

  pageSize() {
    this.totalPages = Math.ceil(this.categories.length / 5);
    return this.totalPages;
  }

  StartingPage() {
    this.currentPage = 1;
    this.startingIndex = 0;
    this.endingIndex = 6;
  }
}
