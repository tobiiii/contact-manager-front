import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  lang:string | undefined;
  sideBarOpen = true;
  userFullName = "";
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.lang=localStorage.getItem('lang') || 'en';
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

  changeLang(lang: string){
    localStorage.setItem('lang',lang);
    window.location.reload();
  }
}