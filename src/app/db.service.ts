import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TvInfo } from './app-swiper/app-swiper.component';

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
}
