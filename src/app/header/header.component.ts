import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  sideBarOpen = true;
  userFullName = "";
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    let res
    let stringData = localStorage.getItem('authUser');
    if (stringData) {
      res = JSON.parse(stringData);
      this.userFullName = res.user.firstName + " " + res.user.lastName;
    }
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
}