import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/auth.models.module';
import { UtilsService } from './util.service';


const AUTH_API = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private utilsService : UtilsService,private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const body = { email: email, password: password };
    const options = this.utilsService.getHttpHeadersPOST();
    return this.http.post<any>(this.utilsService.getBaseUrl()+"auth/authentification", body, options);

  }
  setLoggeedInUser = (user: User) => {
    localStorage.setItem('authUser', JSON.stringify(user));
    localStorage.setItem('token', user.token);
    localStorage.setItem('refreshToken', user.refreshToken);
  }


  getToken() {
    let token = localStorage.getItem('token');
    return token ? token : null;
  }

  logout() : Observable<any> {
    const options = this.utilsService.getHttpHeadersGET();
    return this.http.get(this.utilsService.getBaseUrl()+"auth/logout", options);

}

clearLocalStorage() {
  localStorage.removeItem('authUser');
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
}

}
