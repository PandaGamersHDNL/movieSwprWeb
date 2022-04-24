import { Component, OnInit } from '@angular/core';
import { TvInfo } from '../app-swiper/app-swiper.component';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../db.service';

@Component({
  selector: 'app-info-details',
  templateUrl: './info-details.component.html',
  styleUrls: ['./info-details.component.css']
})
export class InfoDetailsComponent implements OnInit {
  public tvInfo: TvInfo= {title: "loading..."};
  public id: string | null = null;
  public data: TvInfo[] = [];
  constructor(private _Activatedroute:ActivatedRoute, private db:DbService) {
    this.id=this._Activatedroute.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.onGetData()
  }

  onGetData(){
    this.db.getData().subscribe({
      next: (v) => this.data = v,
      error: (e) => console.log(e),
      complete: () => {
        console.log(this.id);
        console.log(this.data);
        this.setInfo();
      }


    })
  }
  setInfo() {
    const info = this.data.find((e) => e.id == this.id)
    if(info == undefined) {
      this.tvInfo = {title: "Can't find" + this.id}
    } else {
      this.tvInfo = info;
    }
  }
}
