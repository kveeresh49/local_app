import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-search-nav-bar',
  templateUrl: './top-search-nav-bar.component.html',
  styleUrls: ['./top-search-nav-bar.component.scss']
})
export class TopSearchNavBarComponent implements OnInit {
  public sidebarShow: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
