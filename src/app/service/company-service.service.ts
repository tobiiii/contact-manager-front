import { Injectable } from '@angular/core';
import { UtilsService } from './util.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CompanyServiceService {

  constructor(private utilsService : UtilsService, private http : HttpClient) { }

  getCompanies () : Observable<any> { 
    const options = this.utilsService.getHttpHeadersGET();
    return this.http.get(`${this.utilsService.getBaseUrl()}company/find_all`, options);
  }

  addCompany (params :any) : Observable<any> {
    const options = this.utilsService.getHttpHeadersPOST();
    return this.http.post(`${this.utilsService.getBaseUrl()}company/add`, params, options);
  }

  updateCompany (id:number, params :any) : Observable<any> {
    const options = this.utilsService.getHttpHeadersPOST();
    return this.http.put(`${this.utilsService.getBaseUrl()}company/update/${id}`, params, options);
  }

  getDetailCompany(id:any): Observable<any> {
    const options = this.utilsService.getHttpHeadersGET();
    return this.http.get(`${this.utilsService.getBaseUrl()}company/detail/${id}`, options);
  }

  deleteCompany (id : number) : Observable<any> {
    const options = this.utilsService.getHttpHeadersGET();
    return this.http.delete(`${this.utilsService.getBaseUrl()}company/delete/${id}`, options);
  }
}
