import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-navbar',
  templateUrl: './store-navbar.component.html',
  styleUrls: ['./store-navbar.component.scss']
})
export class StoreNavbarComponent implements OnInit {
  selectedNavItem = 'o';
  leftNavItems = ["Fresh Vegetables","Fresh Fruits","Organic Vegetables","Herbs & Seasonals"];
  selectedLeftNavItem = this.leftNavItems[0];
  itemCount = 0;

  constructor() { }

  ngOnInit(): void {
  }

  getNavItem(value:any) {
    this.selectedNavItem = value;
  }

  getLeftNavItem(value:any) {
    this.selectedLeftNavItem = value;
  }

  increment() {
    this.itemCount = this.itemCount + 1; 
  }

  decrement() {
    this.itemCount = this.itemCount - 1;
  }

}
