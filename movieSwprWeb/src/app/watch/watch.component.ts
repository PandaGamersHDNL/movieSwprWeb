import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IdObject, TvInfo } from '../app-swiper/app-swiper.component';
import { EventButtons } from '../buttons/buttons.component';
import { DbService } from '../db.service';
import { categoryToString, stringToCategory } from '../info-details/info-details.component';

@Component({
  template: ''
})
export class RemoveButtons{
  public infoId: string = "";
  public btn:EventButtons = EventButtons.no;
  constructor(public router:Router, public db: DbService) {
  }

  buttonClicked(button: EventButtons, id:string | undefined = undefined) {
    if(this.btn == EventButtons.no) {
      console.error("this buttons is part of a no btn class which is not a category in the data base");

    }
    if (!id)
    { console.error("no id to get from clicked");

      id = this.infoId
      if(id.length != 9){
        console.error("id isn't right lenght", id);

        return;
      }
    } else {
      console.info("there was a valid id so it is now class infoId", id);

      this.infoId = id;
    }

      switch (button) {
        case this.btn:
          this.deleteCategory(this.btn)
          break;
        case EventButtons.no:
          this.deleteCategory(this.btn)
          break;
        case EventButtons.favorite:
          this.db.postFav({ "id": this.infoId });
          break;
        case EventButtons.seen:
          this.deleteCategory(EventButtons.watch)
          this.db.postSeen({ "id": this.infoId });
          break;
        case EventButtons.watch:
          this.db.postWatch(({ "id": this.infoId }));
          break;
        default:
          break;
        }
        this.router.navigateByUrl(categoryToString(this.btn))
  }
  deleteCategory(category: EventButtons) {
      this.db.delFrom(category, this.infoId)
  }
}

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent extends RemoveButtons implements OnInit  {
  public display: TvInfo[] = [];
  public allInfoCategory: TvInfo[] = [];
  public data: TvInfo[] = [];
  public watchIds: IdObject[] = [];
  public displayBtn: Record<string, boolean> = {};
  public search = "";
  constructor(db: DbService, router:Router) {
    super(router, db)
    const route = router.getCurrentNavigation()?.extractedUrl.toString().substring(1)
    this.btn = stringToCategory(route!);
  }

  valData(): boolean{
    return this.display.length > 0;
  }

  async ngOnInit(): Promise<void> {
    this.onGetData();
  }

  async onGetFrom() {
    this.db.getFrom(this.btn).subscribe({
      next: (v) => {
        this.watchIds = v;
      },
      error: (e) => console.error(e),
      complete: () => this.createAllDisplay()
    });
  }
  async onGetData() {
    this.db.getData().subscribe({
      next: (v) => {
        this.data = v;
      },
      error: (e) => console.error(e),
      complete: () => this.onGetFrom()
    });
  }
  createAllDisplay() {
    const allDisplay = this.watchIds.map(e => this.data.find(v => v.id == e.id)) as TvInfo[];
    allDisplay.forEach(e => this.displayBtn[e.id!] = false)
    this.allInfoCategory = allDisplay;
    this.display = allDisplay;
  }

  onSearch() {
    console.log(this.allInfoCategory);

    const temp = this.allInfoCategory.filter( e => {
      return e.title?.toLowerCase().includes(this.search)
    });
    this.display = temp
    console.log(this.display);
  }

  override deleteCategory(category: EventButtons): void {
    super.deleteCategory(category)
    const index = this.display.findIndex( e=> e.id == this.infoId)
    this.display.splice(index, 1)
    const i = this.allInfoCategory.findIndex( e=> e.id == this.infoId)
    this.allInfoCategory.splice(index, 1)
  }
  mouseHover(id: string| undefined){
    this.displayBtn[id!] = true;

  }

  mouseLeave(id: string | undefined){
    this.displayBtn[id!] = false;
  }
}
