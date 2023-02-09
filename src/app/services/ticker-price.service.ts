import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { API_KEY, API_URL } from '../helpers/api-data';
import { tick } from '@angular/core/testing';

const API_PARAM = '/data/price';

@Injectable({
  providedIn: 'root',
})
export class TickerPriceService {
  constructor(private http: HttpClient) {}

  getPrice(tickerName: string): Observable<number> {
    let url = new URL(API_PARAM, API_URL);
    url.searchParams.set('api_key', API_KEY);
    url.searchParams.set('fsym', `${tickerName}`);
    url.searchParams.set('tsyms', 'USD');

    return this.http.get<any>(`${url.href}`).pipe(
      map((rawData) => {
        return rawData.USD;
      })
    );
  }
}
