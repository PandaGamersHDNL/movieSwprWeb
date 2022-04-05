import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import dummyData from 'src/dummydata.json'

@Component({
  selector: 'app-swiper',
  templateUrl: './app-swiper.component.html',
  styleUrls: ['./app-swiper.component.css']
})
export class AppSwiperComponent implements OnInit {
  public tvInfo: TvInfo;
  constructor() {
    this.tvInfo = {}
  }

  async ngOnInit(): Promise<void> {
    //this.tvInfo = await genCheckedInfo();
    this.tvInfo = dummyData[1] as unknown as TvInfo;
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
    id += genDigit()
  }
  return id;
}

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
interface TvInfo {
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
async function genDummyToConsole() {
  
  const infos: TvInfo[] = [];
  try {
    while (true) {
      const tvInfo = await genCheckedInfo()
      infos.push(tvInfo);
    }
  } catch {
    console.log("limit reached");
  }
  finally{
    console.log(infos)
  }
}