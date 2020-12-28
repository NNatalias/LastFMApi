import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const httpsReq = req.clone({
      url: req.url.replace('apiKey', 'c6f2e4ebe75127eb6cf6bf4909f5d850')
    });
    return next.handle(httpsReq).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error) {
          console.log('inInterceptor:', error.message);
        }
        return throwError(error);
      })
    );
}}
