import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-near-by-stores',
  templateUrl: './near-by-stores.component.html',
  styleUrls: ['./near-by-stores.component.scss']
})
export class NearByStoresComponent implements OnInit {

  @Input() nearByStoreData :any;
  constructor() { }

  ngOnInit(): void {
  }

}
