import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TvInfo } from '../app-swiper/app-swiper.component';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../db.service';
import { EventButtons } from '../buttons/buttons.component';

@Component({
  selector: 'app-info-details',
  templateUrl: './info-details.component.html',
  styleUrls: ['./info-details.component.css']
})
export class InfoDetailsComponent implements OnInit {
  public tvInfo: TvInfo = {};
  public id: string | null = null;
  public data: TvInfo[] = [];
  public btn = EventButtons.watchLater
  @ViewChild("comment")
  commentRef!: ElementRef;
  //send DATA from previous page -> the global data should be there and can't change
  constructor(private _Activatedroute: ActivatedRoute, private db: DbService) {
    this.id = this._Activatedroute.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.onGetData()
  }

  onGetData() {
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
    if (info == undefined) {
      this.tvInfo = { title: "Can't find" + this.id }
    } else {
      this.tvInfo = info;
    }
  }
  save(): void {
    this.tvInfo.comment = this.commentRef.nativeElement.value;
    this.db.putData(this.tvInfo);
  }
  cancel(): void {
    if(this.tvInfo.comment)
      this.commentRef.nativeElement.value = this.tvInfo.comment;
    else
    this.commentRef.nativeElement.value = "";
  }
  buttonClicked(button: EventButtons){
    switch (button) {
      case EventButtons.no:

        break;

      default:
        break;
    }
  }
}
