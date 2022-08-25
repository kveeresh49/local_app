import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-today-highlights',
  templateUrl: './today-highlights.component.html',
  styleUrls: ['./today-highlights.component.scss']
})
export class TodayHighlightsComponent implements OnInit {
  startingIndex = 0;
  endingIndex = 3;
  totalPages = 0;
  currentPage = 1;

  @Input() highlightCards:any;
  constructor() { }

  ngOnInit(): void {
  }

  storeScroll(type:string) {
    if (type === "next") {
      this.startingIndex = this.startingIndex + 3;
      this.endingIndex = this.endingIndex + 3;
      this.currentPage += 1;
    }
    if (type === "prev") {
      this.startingIndex = this.startingIndex - 3;
      this.endingIndex = this.endingIndex - 3;
      this.currentPage -= 1;
    }
  }
  
  pageSize() {
    this.totalPages = Math.ceil(this.highlightCards.length / 3);
    return this.totalPages;
  }
  
  StartingPage() {
    this.currentPage = 1;
    this.startingIndex = 0;
    this.endingIndex = 3;
  }

}
