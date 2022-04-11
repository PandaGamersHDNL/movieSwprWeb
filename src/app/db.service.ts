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

  onGetData(): void{
    this.getData().subscribe({
      next: (v) => {console.log(v);this.data = v;},
      error: (e) => console.error(e),
      complete: () => console.info('complete')
  });
  }
}
