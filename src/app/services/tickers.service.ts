import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface Response {
  Response: string;
  Message: string;
  HasWarning: string;
  Type: string;
  RateLimit: string;
  Data: Object;
}

const API_KEY =
  '9328c57cfb5aaefe19d3bccb356eb7188a516b0dedf7f6b7708d4322b6a8281f';

@Injectable({
  providedIn: 'root',
})
export class TickersService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<string[]> {
    let url = new URL('https://min-api.cryptocompare.com/data/blockchain/list');
    url.searchParams.set('api_key', API_KEY);

    return this.http.get<Response>(`${url.href}`).pipe(
      map((rawData) => {
        return Object.keys(rawData.Data);
      })
    );
  }
}
