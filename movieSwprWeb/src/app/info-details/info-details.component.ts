import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TvInfo } from '../app-swiper/app-swiper.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from '../db.service';
import { EventButtons } from '../buttons/buttons.component';
import { RemoveButtons } from '../watch/watch.component';

@Component({
  selector: 'app-info-details',
  templateUrl: './info-details.component.html',
  styleUrls: ['./info-details.component.css']
})
export class InfoDetailsComponent extends RemoveButtons implements OnInit {
  public tvInfo: TvInfo = {};
  public data: TvInfo[] = [];
  @ViewChild("comment")
  commentRef!: ElementRef;
  //send DATA from previous page -> the global data should be there and can't change
  constructor(private _Activatedroute: ActivatedRoute, router: Router, db: DbService) {
    super(router, db);

    const from = this._Activatedroute.snapshot.paramMap.get("from");
    if (from){
      const btn = stringToCategory(from);
      this.btn =btn
    }
  }

  ngOnInit(): void {
    const id = this._Activatedroute.snapshot.paramMap.get("id");
    console.log(id);

    if (id){
      this.infoId = id;
    }
    this.onGetData();
  }

  onGetData() {
    this.db.getData().subscribe({
      next: (v) => this.data = v,
      error: (e) => console.log(e),
      complete: () => {
        console.log(this.infoId);
        console.log(this.data);
        this.setInfo();
      }
    })
  }
  setInfo() {
    const info = this.data.find((e) => e.id == this.infoId)
    if (info == undefined) {
      this.tvInfo = { title: "Can't find" + this.infoId }
    } else {
      this.tvInfo = info;
    }
  }
  save(): void {
    this.tvInfo.comment = this.commentRef.nativeElement.value;
    this.db.putData(this.tvInfo);
  }
  cancel(): void {
    if (this.tvInfo.comment)
      this.commentRef.nativeElement.value = this.tvInfo.comment;
    else
      this.commentRef.nativeElement.value = "";
  }
}

export function categoryToString(category: EventButtons) {
  switch (category) {
    case EventButtons.favorite:
      return "favorite"
    case EventButtons.seen:
      return "seen"
    case EventButtons.watch:
      return "watch"
    default:
      return ""
  }
}

export function stringToCategory(str: string): EventButtons {
  switch (str) {
    case "favorite":
      return EventButtons.favorite
    case "seen":
      return EventButtons.seen
    case "watch":
      return EventButtons.watch
    default:
      return EventButtons.no
  }
}
