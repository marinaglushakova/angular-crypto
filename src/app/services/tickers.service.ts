import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ITickersListResponse } from '../model/tickers-list-response';
import { ErrorService } from './error.service';

import { API_KEY, API_URL } from '../helpers/api-data';

const API_PARAM = '/data/blockchain/list';

@Injectable({
  providedIn: 'root',
})
export class TickersService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  getAll(): Observable<string[]> {
    let url = new URL(API_PARAM, API_URL);
    url.searchParams.set('api_key', API_KEY);

    return this.http.get<ITickersListResponse>(`${url.href}`).pipe(
      map((rawData) => {
        return Object.keys(rawData.Data);
      }),
      catchError(this.errorHandler.bind(this))
    );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
