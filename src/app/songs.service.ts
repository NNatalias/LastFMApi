import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, Subject, throwError} from 'rxjs';

@Injectable({providedIn: 'root'})
export class SongsService {
  constructor(private http: HttpClient) {
  }
  public error$: Subject<string> = new Subject<string>();
  getTop(): any {
    return this.http.get(`https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=apiKey&format=json`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }
  searchSong(songName: string): any {
    return this.http.get(`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${songName}&api_key=apiKey&format=json`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }
  private handleError(error: HttpErrorResponse): Observable<any> {
    switch (error.error.error.toString()) {
      case '2':
        this.error$.next('Недействительный сервис - такой сервис не существует');
        break;
      case '3':
        this.error$.next('Недействительный метод - в этом пакете нет метода с таким именем');
        break;
      case '4':
        this.error$.next('Ошибка аутентификации - у вас нет разрешения на доступ к службе.');
        break;
      case '5':
        this.error$.next('Неверный формат - эта служба не существует в этом формате.');
        break;
      case '6':
        this.error$.next('Недопустимые параметры - в вашем запросе отсутствует обязательный параметр.');
        break;
      case '7':
        this.error$.next('Указан недопустимый ресурс');
        break;
      case '8':
        this.error$.next('Операция не удалась - что-то пошло не так');
        break;
      case '9':
        this.error$.next('Недействительный ключ сеанса - пожалуйста, повторите аутентификацию');
        break;
      case '10':
        this.error$.next('Недействительный ключ API. Last.fm должен предоставить вам действительный ключ.');
        break;
      case '11':
        this.error$.next('Служба отключена - эта служба временно отключена. Попробуйте позже');
        break;
      case '13':
        this.error$.next('Предоставлена неверная подпись метода');
        break;
      case '16':
        this.error$.next('При обработке вашего запроса произошла временная ошибка. Пожалуйста, попробуйте еще раз');
        break;
      case '26':
        this.error$.next('Приостановленный ключ API - доступ к вашей учетной записи приостановлен, обратитесь в Last.fm');
        break;
      case '29':
        this.error$.next('Превышен лимит скорости - ваш IP-адрес сделал слишком много запросов за короткий период.');
        break;
    }
    return throwError(error);
  }
}
