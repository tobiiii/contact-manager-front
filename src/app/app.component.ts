import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'contact-manager';
  sideBarOpen = true;
  isLoggedIn = false;
  userFullName="";

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  constructor(private router: Router,
    private translateService:TranslateService) {
      this.translateService.setDefaultLang('en');
      this.translateService.use(localStorage.getItem('lang') || 'en');
    router.events.subscribe((val)=>{
      this.isLoggedIn = !!localStorage.getItem('token');
    });
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      let res
      let stringData = localStorage.getItem('authUser');
      if (stringData) {
        console.log(stringData);
        res = JSON.parse(stringData);
        this.userFullName = res.user.firstName +" "+res.user.lastName;
      }
    }
  } 

}