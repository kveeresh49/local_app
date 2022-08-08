import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-menu-nav-bar',
  templateUrl: './top-menu-nav-bar.component.html',
  styleUrls: ['./top-menu-nav-bar.component.scss']
})
export class TopMenuNavBarComponent implements OnInit {
  public sidebarShow: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  menuClick() {
    this.sidebarShow = !this.sidebarShow;
  }

  closeSideNav(sidebarShow: boolean) {
    this.sidebarShow = sidebarShow;
  }

}
