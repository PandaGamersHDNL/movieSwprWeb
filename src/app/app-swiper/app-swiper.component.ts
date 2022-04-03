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

  ngOnInit(): void {
    getIdInfo(genTitleId());
  }

}

function genTitleId(): string {
  //valid ids start with tt
  let id = "tt";
  id += Math.floor(Math.random() * 10000000)
  return id;
}

//finds a movie / tv show based on id (make type for valid id?)
function getIdInfo(id:string) {
  const link = `https://imdb-api.com/en/API/Title/${environment.apiKey}/${id}`
  
  fetch(link)
          // the JSON body is taken from the response
          .then(res => res.json())
          .then(res => {
                  // The response has an `any` type, so we need to cast
                  // it to the `User` type, and return it from the promise
                  console.log(res);
                  return res;
          })
}

//checks db for overlapping ids 
function checkOverlap(id :string) {

}

