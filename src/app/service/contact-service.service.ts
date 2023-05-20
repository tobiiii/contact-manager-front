import { Injectable } from '@angular/core';
import { UtilsService } from './util.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  constructor(private utilsService : UtilsService, private http : HttpClient) { }

  getContacts () : Observable<any> { 
    const options = this.utilsService.getHttpHeadersGET();
    return this.http.get(`${this.utilsService.getBaseUrl()}contact/find_all`, options);
  }

  addContact (params :any) : Observable<any> {
    const options = this.utilsService.getHttpHeadersPOST();
    return this.http.post(`${this.utilsService.getBaseUrl()}contact/add`, params, options);
  }

  updateContact (id:number, params :any) : Observable<any> {
    const options = this.utilsService.getHttpHeadersPOST();
    return this.http.put(`${this.utilsService.getBaseUrl()}contact/update/${id}`, params, options);
  }

  getDetailContact(id:any): Observable<any> {
    const options = this.utilsService.getHttpHeadersGET();
    return this.http.get(`${this.utilsService.getBaseUrl()}contact/detail/${id}`, options);
  }

  deleteContact (id : number) : Observable<any> {
    const options = this.utilsService.getHttpHeadersGET();
    return this.http.delete(`${this.utilsService.getBaseUrl()}contact/delete/${id}`, options);
  }

  joinCompany (contactId : number,companyId : number) : Observable<any> {
    const options = this.utilsService.getHttpHeadersGET();
    return this.http.put(`${this.utilsService.getBaseUrl()}contact/add_to_company/${contactId}/${companyId}`, options);
  }

}
