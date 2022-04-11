import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DbService } from '../db.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

@Component({
  selector: 'app-swiper',
  templateUrl: './app-swiper.component.html',
  styleUrls: ['./app-swiper.component.css'],
})
export class AppSwiperComponent implements OnInit {
  public tvInfo: TvInfo;
  public data: TvInfo[] = [];

  constructor(private db: DbService) {
    this.tvInfo = {}
    //const handler = new HttpClient()
    //this.db = new DbService()
  }

  async onGetData(): Promise<TvInfo[]> {
    this.db.getData().subscribe({
      next: (v) => {
        this.data = v;
        this.tvInfo = v[genRandomIndex(v.length)];
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });

    return this.data;
  }

  async ngOnInit(): Promise<void> {
    this.onGetData();
  }
  public valRuntime() {
    return this.tvInfo.runtimeStr ? true : false;
  }
  public valYear() {
    return this.tvInfo.year ? true : false;
  }
  public valPlot() {
    return this.tvInfo.plot ? true : false;
  }

  public valImdbRating() {
    return this.tvInfo.imDbRating ? true : false;
  }

  public valContentRating() {
    return this.tvInfo.contentRating ? true : false;
  }
}

async function genCheckedInfo() {
  let tvInfo: TvInfo | undefined = undefined;
  do {
    const id = genTitleId()
    if (checkOverlap(id)) {
      tvInfo = await getIdInfo(id);
      console.log(tvInfo.errorMessage);
      console.log(tvInfo.errorMessage?.match("Maximum usage"));
      if (tvInfo.errorMessage?.match("Maximum usage") != null) {
        throw new Error("maximum usage reached")
      }
    }
  } while (tvInfo == undefined || !tvInfo.title || tvInfo.type == "TVEpisode")
  return tvInfo;
}

function genTitleId(): string {
  //valid ids start with tt and has 7digits
  let id = "tt";
  for (let index = 0; index < 7; index++) {
    id += genDigit();
  }
  return id;
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

//checks db for overlapping ids
function checkOverlap(id: string): boolean {
  //TODO
  return true;
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
async function genDummyToConsole(): Promise<void> {

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
}

function genRandomIndex(length: number): number {
  // last index = length - 1
  return Math.floor(Math.random() * length)
}
