import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { failedId, TvInfo } from './app-swiper/app-swiper.component';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  dbUrl = "http://localhost:3000";
  constructor(private http: HttpClient) { }

  getApiFail(): Observable<{date: string}> {
    return this.http.get<{date: string}>(`${this.dbUrl}/apiFail`);
  }
  postApiFail() {
    const date = new Date();
    const data = {date: date.toUTCString()}

    this.http.post(`${this.dbUrl}/apiFail`, data).subscribe({
      error: (e) => { console.log(e); },
      complete: () => { console.log("post complete"); }
    }
    );
  }

  getFailedId(): Observable<failedId[]> {
    return this.http.get<failedId[]>(`${this.dbUrl}/failedId`);
  }
  postFailedId(data: failedId) {
    this.http.post(`${this.dbUrl}/failedId`, data).subscribe({
      error: (e) => { console.log(e); },
      complete: () => { console.log("post complete"); }
    }
    );
  }


  getSeen(): Observable<TvInfo[]> {
    return this.http.get<TvInfo[]>(`${this.dbUrl}/seen`);
  }
  postSeen(data: TvInfo) {
    console.log("post seen");
    this.http.post(`${this.dbUrl}/seen`, data).subscribe({
      error: (e) => { console.log(e); },
      complete: () => { console.log("post seen complete"); }
    }
    );
  }

  getWatch(): Observable<TvInfo[]> {
    return this.http.get<TvInfo[]>(`${this.dbUrl}/watch`);
  }
  postWatch(data: TvInfo) {
    console.log("post watch");
    this.http.post(`${this.dbUrl}/watch`, data).subscribe({
      error: (e) => { console.log(e); },
      complete: () => { console.log("post complete"); }
    }
    );
  }

 getFav(): Observable<TvInfo[]> {
    return this.http.get<TvInfo[]>(`${this.dbUrl}/favorite`);
  }
  postFav(data: TvInfo) {
    console.log("post watch");
    this.http.post(`${this.dbUrl}/favorite`, data).subscribe({
      error: (e) => { console.log(e); },
      complete: () => { console.log("post complete"); }
    }
    );
  }

  getData(): Observable<TvInfo[]> {
    return this.http.get<TvInfo[]>(`${this.dbUrl}/data`);
  }
  postData(data: TvInfo) {
    console.log("post watch");
    this.http.post(`${this.dbUrl}/data`, data).subscribe({
      error: (e) => { console.log(e); },
      complete: () => { console.log("post complete"); }
    }
    );
  }
}
