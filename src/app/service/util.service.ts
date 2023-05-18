import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {

  constructor(private router: Router,private _snackBar: MatSnackBar) { }

  getHttpHeadersPOST() {

    let header = new HttpHeaders();
    header = header.append('content-type', 'application/json');
    const options = {
      headers: header,
      withCredentials: true,
    };
    return options;
  }


  getHttpHeadersDownloadPOST() {

    let header = new HttpHeaders();
    header = header.append('content-type', 'application/json');
    //header = header.append('CANAL', 'WEB');

    const options = {
      headers: header,
      withCredentials: true,
      responseType: 'blob' as 'json',
    };
    return options;
  }

  getHttpHeadersGET() {
    let header = new HttpHeaders();
    header = header.append('content-type', 'application/json');
    const options = {
      headers: header,
      withCredentials: true,
    };
    return options;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getFullName(): string {
    const userDate = this.getUserInfo();
    if (!userDate) {
      return '';
    }
    return [userDate.firstname, userDate.lastname].join(' ');
  }

  getUserInfo() {
    let stringData = localStorage.getItem('authUser');
    let user;

    if (stringData) {
      user = JSON.parse(stringData);
    }

    return user;
  }

  isLogin() {
    let stringData = localStorage.getItem('authUser');
    let user;

    if (stringData) {
      user = JSON.parse(stringData);
      if (user.token != null && user.redirectTo == 'APPLICATION_NAVIGATION') {
        return true;
      }
    }

    return false;
  }

  getUserName(): string {
    return String(localStorage.getItem('username') ?? '') || '';
  }

  setUserName(value: string) {
    localStorage.setItem('username', value);
  }

  reload(route: string, queryParams: any | null) {
    console.log(route);
    console.log(queryParams);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`${route}`], { queryParams: queryParams }).then(() => {
      })
    });
  }

  getBaseUrl(){
    return 'https://contactmanager-5uk5.onrender.com/api/';
  }

  openSnackBar(message: string, action: string = 'ok') {
    this._snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'top',
    });
  }

}
