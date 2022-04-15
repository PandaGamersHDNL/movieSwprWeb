import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { failedId, TvInfo } from './app-swiper/app-swiper.component';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  dbUrl = "http://localhost:3000";
  data: TvInfo[] = [];
  constructor(private http: HttpClient) { }

  getData(): Observable<TvInfo[]> {
    return this.http.get<TvInfo[]>(`${this.dbUrl}/data`);
  }

  getWatch(): Observable<TvInfo[]>{
    return this.http.get<TvInfo[]>(`${this.dbUrl}/watch`);
  }

  getFailed(): Observable<failedId[]>{
    return this.http.get<failedId[]>(`${this.dbUrl}/failedId`);
  }

  postSeen(data: TvInfo) {
    console.log("post seen");
    this.http.post(`${this.dbUrl}/seen`, data).subscribe({
      error: (e) => {console.log(e);},
      complete: () => {console.log("post seen complete");}
      }
    );
  }

  postWatch(data: TvInfo) {
    console.log("post watch");
    this.http.post(`${this.dbUrl}/watch`, data).subscribe({
      error: (e) => {console.log(e);},
      complete: () => {console.log("post complete");}
      }
    );
  }

  postData(data: TvInfo) {
    console.log("post watch");
    this.http.post(`${this.dbUrl}/data`, data).subscribe({
      error: (e) => {console.log(e);},
      complete: () => {console.log("post complete");}
      }
    );
  }

  postFav(data: TvInfo) {
    console.log("post watch");
    this.http.post(`${this.dbUrl}/favorite`, data).subscribe({
      error: (e) => {console.log(e);},
      complete: () => {console.log("post complete");}
      }
    );
  }

  postFailedId(data: failedId) {
    console.log(data);

    console.log("post watch");
    this.http.post(`${this.dbUrl}/failedId`, data).subscribe({
      error: (e) => {console.log(e);},
      complete: () => {console.log("post complete");}
      }
    );
  }
}
