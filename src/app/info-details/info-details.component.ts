import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TvInfo } from '../app-swiper/app-swiper.component';
import { ActivatedRoute, Router } from '@angular/router';
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
  public btn = EventButtons.watch
  @ViewChild("comment")
  commentRef!: ElementRef;
  //send DATA from previous page -> the global data should be there and can't change
  constructor(private _Activatedroute: ActivatedRoute, private db: DbService, private router: Router) {
    this.id = this._Activatedroute.snapshot.paramMap.get("id");
    const from = this._Activatedroute.snapshot.paramMap.get("from");
    if (from)
      this.btn = stringToCategory(from);

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
    if (this.tvInfo.comment)
      this.commentRef.nativeElement.value = this.tvInfo.comment;
    else
      this.commentRef.nativeElement.value = "";
  }
  buttonClicked(button: EventButtons) {
    if (this.tvInfo.id)
      switch (button) {
        case this.btn:
          this.deleteCategory(this.btn)
          break;
        case EventButtons.no:
          this.deleteCategory(this.btn)
          break;
        case EventButtons.favorite:
          this.db.postFav({ "id": this.tvInfo.id });
          break;
        case EventButtons.seen:
          this.deleteCategory(EventButtons.watch)
          this.db.postSeen({ "id": this.tvInfo.id });
          break;
        case EventButtons.watch:
          this.db.postWatch(({ "id": this.tvInfo.id }));
          break;
        default:
          break;
        }
        this.router.navigateByUrl(categoryToString(this.btn))
  }
  deleteCategory(category: EventButtons) {
    if (this.tvInfo.id) {
      this.db.delFrom(categoryToString(category), this.tvInfo.id)
    }
  }
}

function categoryToString(category: EventButtons) {
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

function stringToCategory(str: string): EventButtons {
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
