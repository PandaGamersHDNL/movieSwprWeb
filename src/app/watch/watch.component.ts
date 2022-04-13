import { Component, OnInit } from '@angular/core';
import { TvInfo } from '../app-swiper/app-swiper.component';
import { DbService } from '../db.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {
  public watch: TvInfo[] = [];
  constructor(private db: DbService) { }

  ngOnInit(): void {
    this.onGetWatch();
  }

  onGetWatch() {
    this.db.getWatch().subscribe({
      next: (v) => {
        this.watch = v;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }
}
