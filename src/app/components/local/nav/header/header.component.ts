import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuList = [
    { menuItemName: 'Medical' },
    { menuItemName: 'Groceries' },
    { menuItemName: 'Liquor' },
    { menuItemName: 'Fruits & Vegetables' },
    { menuItemName: 'From the Farms' },
    { menuItemName: 'Terrace Gardens' },
    { menuItemName: 'Gallery' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
