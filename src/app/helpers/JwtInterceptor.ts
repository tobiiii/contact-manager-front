import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilsService } from '../service/util.service';

@Injectable()

export class JwtInterceptor implements HttpInterceptor {

    constructor(private utilsService: UtilsService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
        const currentUser = this.utilsService.getUserInfo();
        const token = this.utilsService.getToken();
        if (currentUser && token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request);
    }
}
