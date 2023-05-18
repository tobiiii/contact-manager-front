import { Injectable } from '@angular/core';
import { UtilsService } from './util.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {

  constructor(private utilsService : UtilsService, private http : HttpClient) { }

  getProfiles () : Observable<any> { 
    const options = this.utilsService.getHttpHeadersGET();
    return this.http.get(`${this.utilsService.getBaseUrl()}profile/find_all`, options);
  }

  getPrivileges () : Observable<any> {
    const options = this.utilsService.getHttpHeadersGET();
    return this.http.get(`${this.utilsService.getBaseUrl()}privilege/find_all`, options);
  }

  addRole (params :any) : Observable<any> {
    const options = this.utilsService.getHttpHeadersPOST();
    return this.http.post(`${this.utilsService.getBaseUrl()}profile/add`, params, options);
  }

  updateRole (id:number, params :any) : Observable<any> {
    const options = this.utilsService.getHttpHeadersPOST();
    return this.http.put(`${this.utilsService.getBaseUrl()}profile/update/${id}`, params, options);
  }

  getDetailRole(id:any): Observable<any> {
    const options = this.utilsService.getHttpHeadersGET();
    return this.http.get(`${this.utilsService.getBaseUrl()}profile/detail/${id}`, options);
  }

  deleteRole (id : number) : Observable<any> {
    const options = this.utilsService.getHttpHeadersGET();
    return this.http.delete(`${this.utilsService.getBaseUrl()}profile/delete/${id}`, options);
  }
}
