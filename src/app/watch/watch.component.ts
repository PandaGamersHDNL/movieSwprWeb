import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { IdObject, TvInfo } from '../app-swiper/app-swiper.component';
import { DbService } from '../db.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent /*extends nondiscoverbuttons*/ implements OnInit  {
  public watch: TvInfo[] = [];
  public allWatch: TvInfo[] = [];
  public data: TvInfo[] = [];
  public watchIds: IdObject[] = [];
  public displayBtn: Record<string, boolean> = {};
  public search = "";
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
      complete: () => this.createAllWatch()
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
  createAllWatch() {
    console.log("create watch");

    const allWatch = this.watchIds.map(e => this.data.find(v => v.id == e.id)) as TvInfo[];
    allWatch.forEach(e => this.displayBtn[e.id!] = false)
    console.log(this.displayBtn);
    this.allWatch = allWatch;
    this.watch = allWatch;
    console.log(allWatch);

  }

  onSearch() {
    const temp = this.allWatch.filter( e => {
      return e.title?.toLowerCase().includes(this.search)
    });
    this.watch = temp
    console.log(this.watch);

  }

  mouseHover(id: string| undefined){
    this.displayBtn[id!] = true;

  }

  mouseLeave(id: string | undefined){
    //this.displayBtn[id!] = false;
  }

}
