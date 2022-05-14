import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IdObject, TvInfo } from './app-swiper/app-swiper.component';

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

  getFailedId(): Observable<IdObject[]> {
    return this.http.get<IdObject[]>(`${this.dbUrl}/failedId`);
  }
  postFailedId(data: IdObject) {
    this.http.post(`${this.dbUrl}/failedId`, data).subscribe({
      error: (e) => { console.log(e); },
      complete: () => { console.log("post complete"); }
    }
    );
  }


  getSeen(): Observable<IdObject[]> {
    return this.http.get<IdObject[]>(`${this.dbUrl}/seen`);
  }
  postSeen(data: IdObject) {
    console.log("post seen");
    this.http.post(`${this.dbUrl}/seen`, data).subscribe({
      error: (e) => { console.log(e); },
      complete: () => { console.log("post seen complete"); }
    }
    );
  }

  getWatch(): Observable<IdObject[]> {
    return this.http.get<IdObject[]>(`${this.dbUrl}/watch`);
  }
  postWatch(data: IdObject) {
    console.log("post watch");
    this.http.post(`${this.dbUrl}/watch`, data).subscribe({
      error: (e) => { console.log(e); },
      complete: () => { console.log("post complete"); }
    }
    );
  }


  getFav(): Observable<IdObject[]> {
    return this.http.get<IdObject[]>(`${this.dbUrl}/favorite`);
  }
  postFav(data: IdObject) {
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
  putData(tvInfo: TvInfo) {
    this.http.put(`${this.dbUrl}/data/${tvInfo.id}`, tvInfo).subscribe({
      error: (e) => { console.log(e); },
      complete: () => { console.log("post complete"); }
    }
    );
  }

  delFrom(from: string, id: string){
    this.http.delete(`${this.dbUrl}/${from}/${id}`).subscribe({
      error: (e) => { console.log(e); },
      complete: () => { console.log("post complete"); }
    }
    );
  }
}
