import { Component, OnInit } from '@angular/core';
import { IdObject, TvInfo } from '../app-swiper/app-swiper.component';
import { DbService } from '../db.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {
  public watch: TvInfo[] = [];
  public data: TvInfo[] = [];
  public watchIds: IdObject[] = [];
  constructor(private db: DbService) { }

  async ngOnInit(): Promise<void> {
    this.onGetData();
  }

  async onGetWatch() {
    this.db.getWatch().subscribe({
      next: (v) => {
        this.watchIds = v;
      },
      error: (e) => console.error(e),
      complete: () => this.createWatch()
    });
  }
  async onGetData() {
    this.db.getData().subscribe({
      next: (v) => {
        this.data = v;
      },
      error: (e) => console.error(e),
      complete: () => this.onGetWatch()
    });

  }
  createWatch() {
    console.log("create watch");

    const watch = this.watchIds.map(e => this.data.find(v => v.id == e.id))as TvInfo[];
    console.log(watch);

    this.watch = watch;
  }
}
