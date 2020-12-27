import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, Subject, throwError} from 'rxjs';

@Injectable({providedIn: 'root'})
export class SongsService {
  constructor(private http: HttpClient) {
  }
  public error$: Subject<string> = new Subject<string>();
  public errorReg$: Subject<string> = new Subject<string>();
  public errorDel$: Subject<string> = new Subject<string>();
  getTop(): any {
   return this.http.get(`https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=apiKey&format=json`)
     .pipe(
       catchError(this.handleError.bind(this))
     );
  }
  searchSong(songName: string): any {
    return this.http.get(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${songName}&api_key=apiKey&format=json`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }
  private handleError(error: HttpErrorResponse): Observable<any> {
    const {message} = error.error.error;
    switch (message) {
      case '2':
        this.error$.next(' Invalid service - This service does not exist');
        break;
      case '3':
        this.error$.next(' Invalid Method - No method with that name in this package');
        break;
      case '4':
        this.errorReg$.next('Authentication Failed - You do not have permissions to access the service');
        break;
      case '5':
        this.errorReg$.next('Invalid format - This service doesnt exist in that format');
        break;
      case '6':
        this.errorDel$.next(' Invalid parameters - Your request is missing a required parameter');
        break;
      case '7':
        this.errorDel$.next(' Invalid resource specified');
        break;
      case '8':
        this.error$.next('Operation failed - Something else went wrong');
        break;
      case '9':
        this.error$.next('Invalid session key - Please re-authenticate');
        break;
      case '10':
        this.errorReg$.next('Invalid API key - You must be granted a valid key by last.fm');
        break;
      case '11':
        this.errorReg$.next('Service Offline - This service is temporarily offline. Try again later');
        break;
      case '13':
        this.errorDel$.next('Invalid method signature supplied');
        break;
      case '16':
        this.errorDel$.next('There was a temporary error processing your request. Please try again');
        break;
      case '26':
        this.errorReg$.next('Suspended API key - Access for your account has been suspended, please contact Last.fm');
        break;
      case '29':
        this.errorDel$.next('Rate limit exceeded - Your IP has made too many requests in a short period');
        break;
    }
    return throwError(error);
  }
}
