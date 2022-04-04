import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-swiper',
  templateUrl: './app-swiper.component.html',
  styleUrls: ['./app-swiper.component.css']
})
export class AppSwiperComponent implements OnInit {
  private title = "undefined";
  constructor() {

  }

  async ngOnInit(): Promise<void> {
    let info: TvInfo = {
      title: null,
      plot: null,
      type: null
    };
    while (!info.title){
      console.log("beep");
    
      info = await getIdInfo(genTitleId());
    }
    console.log(info.type);
    
  }

}

function genTitleId(): string {
  //valid ids start with tt
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
      // The response has an `any` type, so we need to cast
      // it to the `User` type, and return it from the promise
      return res as TvInfo;
    })
}

//checks db for overlapping ids 
function checkOverlap(id: string) {

}

//request return object
interface TvInfo {
  "title": string | null,
  "plot": string | null,
  "type": string | null
}

