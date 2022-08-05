import { Component, OnInit } from '@angular/core';
// import {LandinglogoComponent} from '../../../shared/components/landinglogo/landinglogo.component'
@Component({
  selector: 'app-local-topbar',
  templateUrl: './local-topbar.component.html',
  styleUrls: ['./local-topbar.component.scss']
})
export class LocalTopbarComponent implements OnInit {
  public sidebarShow: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
