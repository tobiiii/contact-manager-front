import { Injectable } from '@angular/core';
import { UtilsService } from './util.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private utilsService : UtilsService, private http : HttpClient) { }

  addUser(params : any):Observable<any>{
    const options = this.utilsService.getHttpHeadersPOST();
    return this.http.post<any>(`${this.utilsService.getBaseUrl()}user/create`, params, options);

   }

 editUser(params : any, id : number):Observable<any>{
     const options = this.utilsService.getHttpHeadersPOST();
     return this.http.patch<any>(`${this.utilsService.getBaseUrl()}user/update/${id}`, params, options);
  }
  
 detailUser(id:number):Observable<any>{ 
   const options = this.utilsService.getHttpHeadersGET();
   return this.http.get(`${this.utilsService.getBaseUrl()}user/detail/${id}`, options)
  }

  getUsers():Observable<any>{
    const options = this.utilsService.getHttpHeadersGET();
    return this.http.get(`${this.utilsService.getBaseUrl()}user/find_all`, options);
  }

  changePass(params : any):Observable<any>{
    const options = this.utilsService.getHttpHeadersPOST();
    return this.http.post<any>(`${this.utilsService.getBaseUrl()}user/change_password`, params, options);

   }

}
