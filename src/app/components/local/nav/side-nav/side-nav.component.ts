import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @Input() sidebarShow: boolean = false;
  @Output() closeSidebar = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['sidebarShow'].currentValue);
    this.sidebarShow = changes['sidebarShow'].currentValue;
  }

  closeSideNav() {
    this.sidebarShow = false;
    this.closeSidebar.emit(this.sidebarShow);
  }
}
