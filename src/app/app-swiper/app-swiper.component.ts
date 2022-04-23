import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DbService } from '../db.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { EventButtons } from '../buttons/buttons.component';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-swiper',
  templateUrl: './app-swiper.component.html',
  styleUrls: ['./app-swiper.component.css'],
})
export class AppSwiperComponent implements OnInit {
  public tvInfo: TvInfo;
  //using these so we don't have to make get calls each time
  public bApi: boolean = false;
  public data: TvInfo[] = [];
  public seen: IdObject[] = [];
  public watch: IdObject[] = [];
  public fav: IdObject[] = [];
  public failed: IdObject[] = [];

  constructor(private db: DbService) {
    this.tvInfo = {}
    //const handler = new HttpClient()
    //this.db = new DbService()
  }
  async ngOnInit(): Promise<void> {
    //this.db.postApiFail();
    this.tvInfo = { title: "initializing" }
    await this.onGetApiFail();
    await this.onGetData();
    await this.onGetFailed();
    await this.onGetWatch();
  }


  async onGetData(): Promise<TvInfo[]> {
    this.db.getData().subscribe({
      next: async (v) => {
        this.data = v;
        this.tvInfo = v[genRandomIndex(v.length)];
        console.log(await this.checkOverlap("tt6550826"));

      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });

    return this.data;
  }

  async onGetFailed(): Promise<void> {
    this.db.getFailedId().subscribe({
      next: async (v) => {
        this.failed = v;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  async onGetWatch(): Promise<TvInfo[]> {
    this.db.getWatch().subscribe({
      next: (v) => {
        this.watch = v;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
    return this.watch;
  }

  async onGetApiFail(): Promise<void> {
    this.db.getApiFail().subscribe({
      next: (v) => {
        const day = new Date(v.date);
        day.setTime(day.getTime() + day.getTimezoneOffset() * 60 * 1000)

        const today = new Date();
        today.setTime(today.getTime() + today.getTimezoneOffset() * 60 * 1000)

        if(dateGtrDate(today, day))
          this.bApi = true
        else
          alert("the api can not request any more, these are from db (dublicates are possible)")
        console.log(this.bApi);


      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  async onGetFav(): Promise<TvInfo[]> {
    this.db.getFav().subscribe({
      next: (v) => {
        this.fav = v;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
    return this.fav;
  }

  async buttonClicked(button: EventButtons) {
    let info: IdObject;
    if (this.tvInfo.id)
      info = { id: this.tvInfo.id };
    else {
      info = { id: "Something went wrong, tried to add non existent ID" };
    }
    if (info.id != undefined) {
      this.tvInfo = { title: "adding to db" };
      switch (button) {
        case EventButtons.no:
          break;
        case EventButtons.seen: {
          this.db.postSeen(info);
          this.seen.push(info);
          break;
        }
        case EventButtons.watchLater: {
          this.db.postWatch(info);
          this.watch.push(info);
          break;
        }
        case EventButtons.favorite:
          this.db.postFav(info);
          this.fav.push(info);
          break;
      }
    }
    this.tvInfo = { title: "Loading new movie" }
    this.tvInfo = await this.genCheckedInfo();
  }
  //checks db for overlapping ids True = not in db
  async checkOverlap(id: string): Promise<boolean> {
    // this but then for seen watched and favorite
    const findTvInfo = (info: TvInfo) => {
      if (info.id == id)
        return true;
      return false;
    }
    if (
      this.failed.find(e => e.id == id) == undefined &&
      this.seen.find(findTvInfo) == undefined &&
      this.watch.find(findTvInfo) == undefined &&
      this.fav.find(findTvInfo) == undefined
    )
      return true;
    else {
      return false;
    }
  }
  //local db TODO: keep local object so we don't have to wait for db interactions?
  async genCheckedInfo() {
    let tvInfo: TvInfo | undefined = undefined;
    let bNewInfo;
    if (this.bApi) {
      do {
        try {
        bNewInfo = false;
        const id = genTitleId()
        if (await this.checkOverlap(id)) {
          const findTvInfo = (info: TvInfo) => {
            if (info.id == id)
              return true;
            return false;
          }
          tvInfo = this.data.find(findTvInfo);
          if (tvInfo == undefined) {
            tvInfo = await this.genCheckedInfoAPI(id);
            bNewInfo = true;
            if (tvInfo.type == "TVEpisode" && tvInfo.id) {
              console.log("post failed for: ", tvInfo.id);
              this.failed.push({ id: tvInfo.id })
              this.db.postFailedId({ id: tvInfo.id });
              tvInfo = undefined;
            }
          }
        }
      } catch {
        tvInfo = this.data[genRandomIndex(this.data.length)]
        break;
      }
      } while (tvInfo == undefined || !tvInfo.title)
    }
    else {
      do {
        tvInfo = this.data[genRandomIndex(this.data.length)]
      } while (tvInfo.id == undefined || (await this.checkOverlap(tvInfo.id)) == false);
    }
    if (bNewInfo) {
      this.data.push(tvInfo);
      this.db.postData(tvInfo);
    }
    return tvInfo;
  }
  //gen with api request
  async genCheckedInfoAPI(id: string) {
    let tvInfo: TvInfo | undefined = undefined;
    tvInfo = await getIdInfo(id);
    console.log(tvInfo.errorMessage);
    console.log(tvInfo.errorMessage?.match("Maximum usage"));
    if (tvInfo.errorMessage?.match("Maximum usage") != null) {
      this.db.postApiFail();
      this.bApi = false;
      alert("maximum api requests reached, all movies will come from db");
      throw Error("Max api req reached");
    }
    return tvInfo;
  }
}



function genTitleId(): string {
  //valid ids start with tt and has 7digits
  let id = "tt";
  for (let index = 0; index < 7; index++) {
    id += genDigit();
  }
  return id;
}

/**
 * if big date is > smal date -> true
 * only in y m and d
 * @param bigDate
 * @param smalDate
 */
function dateGtrDate(bigDate: Date , smalDate: Date ) {
  if(bigDate.getTime() > smalDate.getTime()) {
    if(bigDate.getFullYear() > smalDate.getFullYear()) {
      return true;
    } else if (bigDate.getFullYear() == smalDate.getFullYear()) {
      if(bigDate.getMonth() > smalDate.getMonth()){
        return true;
      } else if (bigDate.getMonth() == smalDate.getMonth()) {
        if(bigDate.getDate() > smalDate.getDate()){
          return true;
        }
      }
    }
  }
  return false;
}
//TODO add seed?
function genDigit(): number {
  return Math.floor(Math.random() * 10);
}
//finds a movie / tv show based on id (make type for valid id?)
async function getIdInfo(id: string): Promise<TvInfo> {
  const link = `https://imdb-api.com/en/API/Title/${environment.apiKey}/${id}`

  return fetch(link)
    // the JSON body is taken from the response
    .then(res => res.json())
    .then(res => {
      return res as TvInfo;
    })
}


//request return object
export interface TvInfo {
  id?: string
  title?: string,
  tagline?: string,
  runtimeStr?: string,
  year?: string,
  plot?: string,
  type?: string,
  errorMessage?: string,
  image?: string,
  genres?: string,
  languages?: string,
  contentRating?: string,
  imDbRating?: string
}
/*async function genDummyToConsole(): Promise<void> {

  const infos: TvInfo[] = [];
  try {
    while (true) {
      const tvInfo = await genCheckedInfo()
      infos.push(tvInfo);
    }
  } catch {
    console.log("limit reached");
  }
  finally {
    console.log(infos)
  }
}*/

function genRandomIndex(length: number): number {
  // last index = length - 1
  return Math.floor(Math.random() * length)
}

export interface IdObject {
  id: string
}
